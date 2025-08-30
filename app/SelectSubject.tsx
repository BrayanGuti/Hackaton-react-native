import { useRouter } from "expo-router"; // si estás usando expo-router
import React from "react";
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useCounterStore } from "../src/store/useSelected"; // ajusta la ruta según tu proyecto

export default function MathematicsApp() {
  const { setTopic } = useCounterStore();
  const router = useRouter();

  const mathCards = [
    {
      id: 1,
      title: "Geometría y medición",
      backgroundImage:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop",
      color: "#6366f1",
      description: "Formas, espacios y medidas",
    },
    {
      id: 2,
      title: "Álgebra y Cálculo",
      backgroundImage:
        "https://images.unsplash.com/photo-1635070041409-8e5ae99d8d5c?w=400&h=300&fit=crop",
      color: "#dc2626",
      description: "Ecuaciones y funciones",
    },
    {
      id: 3,
      title: "Estadística y Probabilidad",
      backgroundImage:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      color: "#059669",
      description: "Datos y análisis",
    },
  ];

  const handleCardPress = (card) => {
    // guardar el tema en Zustand
    setTopic(card.title);

    // navegar a Slice
    router.push("/Slices"); // ajusta la ruta según tu estructura
  };

  const renderMathCard = (card) => (
    <TouchableOpacity
      key={card.id}
      style={styles.cardContainer}
      onPress={() => handleCardPress(card)}
      activeOpacity={0.8}
    >
      <ImageBackground
        source={{ uri: card.backgroundImage }}
        style={styles.cardBackground}
        imageStyle={styles.backgroundImage}
      >
        <View style={styles.overlay} />
        <View style={styles.titleContainer}>
          <Text style={styles.cardTitle}>{card.title}</Text>
        </View>
        <View
          style={[styles.colorIndicator, { backgroundColor: card.color }]}
        />
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>📐 Matemáticas</Text>
          <Text style={styles.headerSubtitle}>
            Selecciona una área de estudio
          </Text>
        </View>
        <View style={styles.cardsContainer}>
          {mathCards.map(renderMathCard)}
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Explora las diferentes ramas de las matemáticas
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#888888",
    textAlign: "center",
  },
  cardsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 20, // React Native 0.71+, o usa marginBottom en cardContainer
  },
  cardContainer: {
    height: 160,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 8, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  cardBackground: {
    flex: 1,
    justifyContent: "flex-end",
    position: "relative",
  },
  backgroundImage: {
    borderRadius: 16,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Overlay oscuro
    borderRadius: 16,
  },
  titleContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    marginHorizontal: 15,
    marginBottom: 15,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.8)",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1a1a1a",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  colorIndicator: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
    fontStyle: "italic",
  },
});

//
