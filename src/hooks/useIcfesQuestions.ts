import { useQuery } from "@tanstack/react-query";
import {
  fetchIcfesQuestions,
  IcfesQuestionsResponse,
} from "../services/geminiApi";

export function useIcfesQuestions(topic: string) {
  return useQuery<IcfesQuestionsResponse>({
    queryKey: ["icfesQuestions", topic],
    queryFn: () => fetchIcfesQuestions(topic),
    enabled: !!topic,
  });
}
