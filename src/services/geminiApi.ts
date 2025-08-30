import axios from "axios";

// Configuración de la API
const GEMINI_API_KEY =
  process.env.GEMINI_API_KEY || "AIzaSyA933Unk50gYetYz5B4DT7HTn7LGNyoTg0";

// URLs actualizadas según la documentación oficial
const BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models";
const GEMINI_MODEL = "gemini-2.5-flash"; // Modelo actualizado

// Configuración de axios con headers oficiales
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "x-goog-api-key": GEMINI_API_KEY,
  },
  timeout: 30000,
});

// Tipos de datos
type ContentSlice = {
  slice: number;
  titulo?: string;
  texto: string;
  imagenes?: { nombre: string; datos: string }[];
};

export type EducationalContentResponse = {
  content: ContentSlice[];
};

type Question = {
  pregunta: string;
  opciones: { texto: string; esCorrecta: boolean }[];
  feedback: { correcto: string; incorrecto: string };
};

export type IcfesQuestionsResponse = {
  preguntas: Question[];
};

// Función para probar la conectividad
export async function testGeminiConnection(): Promise<boolean> {
  const testRequest = {
    contents: [
      {
        parts: [
          {
            text: "Responde solo con 'OK' si puedes procesar este mensaje.",
          },
        ],
      },
    ],
  };

  try {
    const response = await apiClient.post(
      `/${GEMINI_MODEL}:generateContent`,
      testRequest
    );

    if (response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      return true;
    }

    return false;
  } catch (error) {
    console.error("❌ Error de conectividad:", { error });
    return false;
  }
}

// Función mejorada para generar contenido educativo
export async function fetchEducationalContent(
  topic: string
): Promise<EducationalContentResponse> {
  const prompt = {
    contents: [
      {
        parts: [
          {
            text: `Genera contenido educativo sobre "${topic}" para el ICFES. 

IMPORTANTE: Responde ÚNICAMENTE con un JSON válido siguiendo esta estructura exacta:
{
  "content": [
    {
      "slice": 1,
      "titulo": "Título del contenido",
      "texto": "Contenido educativo detallado...",
      "imagenes": []
    }
  ]
}

No incluyas markdown, explicaciones adicionales, ni texto fuera del JSON.`,
          },
        ],
      },
    ],
    // Configuración para obtener respuestas más consistentes
    generationConfig: {
      temperature: 0.3,
      topK: 20,
      topP: 0.8,
      maxOutputTokens: 2048,
      responseMimeType: "application/json", // Forzar respuesta en JSON
    },
  };

  try {
    const response = await apiClient.post(
      `/${GEMINI_MODEL}:generateContent`,
      prompt
    );

    // Verificar estructura de respuesta
    if (!response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error("Estructura de respuesta inválida de la API");
    }

    const textContent = response.data.candidates[0].content.parts[0].text;

    // Limpiar respuesta (remover posible markdown)
    const cleanedJson = textContent
      .replace(/```json\n?|\n?```/g, "")
      .replace(/^\s*```\s*/, "")
      .replace(/\s*```\s*$/, "")
      .trim();

    // Parsear JSON
    const parsedContent = JSON.parse(cleanedJson);

    // Validar estructura
    if (!parsedContent.content || !Array.isArray(parsedContent.content)) {
      throw new Error("Formato de contenido inválido");
    }

    return parsedContent;
  } catch (error) {
    console.error("Error detallado:", { error });

    if (error instanceof SyntaxError) {
      throw new Error("La API no devolvió un JSON válido");
    }

    throw new Error(`No se pudo generar el contenido educativo: ${error}`);
  }
}

// Función mejorada para generar preguntas ICFES
export async function fetchIcfesQuestions(
  topic: string
): Promise<IcfesQuestionsResponse> {
  const prompt = {
    contents: [
      {
        parts: [
          {
            text: `Genera exactamente 3 preguntas de opción múltiple estilo ICFES sobre "${topic}".

IMPORTANTE: Responde ÚNICAMENTE con un JSON válido siguiendo esta estructura exacta:
{
  "preguntas": [
    {
      "pregunta": "Texto de la pregunta",
      "opciones": [
        {"texto": "Opción A", "esCorrecta": false},
        {"texto": "Opción B", "esCorrecta": true},
        {"texto": "Opción C", "esCorrecta": false},
        {"texto": "Opción D", "esCorrecta": false}
      ],
      "feedback": {
        "correcto": "Explicación para respuesta correcta",
        "incorrecto": "Explicación para respuesta incorrecta"
      }
    }
  ]
}

Cada pregunta debe tener exactamente 4 opciones (A, B, C, D) y solo una correcta.
No incluyas markdown, explicaciones adicionales, ni texto fuera del JSON.`,
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.4,
      topK: 25,
      topP: 0.9,
      maxOutputTokens: 3072,
      responseMimeType: "application/json",
    },
  };

  try {
    const response = await apiClient.post(
      `/${GEMINI_MODEL}:generateContent`,
      prompt
    );

    if (!response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error("Estructura de respuesta inválida de la API");
    }

    const textContent = response.data.candidates[0].content.parts[0].text;

    // Limpiar respuesta
    const cleanedJson = textContent
      .replace(/```json\n?|\n?```/g, "")
      .replace(/^\s*```\s*/, "")
      .replace(/\s*```\s*$/, "")
      .trim();

    const parsedQuestions = JSON.parse(cleanedJson);

    // Validar estructura
    if (
      !parsedQuestions.preguntas ||
      !Array.isArray(parsedQuestions.preguntas)
    ) {
      throw new Error("Formato de preguntas inválido");
    }

    // Validar que cada pregunta tenga la estructura correcta
    parsedQuestions.preguntas.forEach((pregunta, index) => {
      if (
        !pregunta.pregunta ||
        !pregunta.opciones ||
        !Array.isArray(pregunta.opciones)
      ) {
        throw new Error(`Pregunta ${index + 1} tiene formato inválido`);
      }

      if (pregunta.opciones.length !== 4) {
        throw new Error(
          `Pregunta ${index + 1} debe tener exactamente 4 opciones`
        );
      }

      const correctas = pregunta.opciones.filter((op) => op.esCorrecta);
      if (correctas.length !== 1) {
        throw new Error(
          `Pregunta ${index + 1} debe tener exactamente una opción correcta`
        );
      }
    });

    return parsedQuestions;
  } catch (error) {
    console.error("Error detallado en preguntas:", { error });

    if (error instanceof SyntaxError) {
      throw new Error("La API no devolvió un JSON válido para las preguntas");
    }

    throw new Error(`No se pudieron generar las preguntas: ${error}`);
  }
}

// Función para verificar el estado de la API
export async function getGeminiApiStatus() {
  try {
    const isConnected = await testGeminiConnection();
    return {
      connected: isConnected,
      model: GEMINI_MODEL,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return {
      connected: false,
      error: error,
      model: GEMINI_MODEL,
      timestamp: new Date().toISOString(),
    };
  }
}
