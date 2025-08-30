import { useQuery } from "@tanstack/react-query";
import {
  EducationalContentResponse,
  fetchEducationalContent,
} from "../services/geminiApi";

export function useEducationalContent(topic: string) {
  return useQuery<EducationalContentResponse>({
    queryKey: ["educationalContent", topic],
    queryFn: () => fetchEducationalContent(topic),
    enabled: !!topic, // La query solo se ejecuta si el topic existe
  });
}
