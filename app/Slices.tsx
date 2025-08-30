import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import ContentCarousel from "../src/components/ContentCarousel";
import EmptyState from "../src/components/EmptyState";
import ErrorState from "../src/components/ErrorState";
import LoadingState from "../src/components/LoadingState";
import { useEducationalContent } from "../src/hooks/useEducationalContent";
import { useCounterStore } from "../src/store/useSelected"; // ✅ Zustand

export default function AboutScreen() {
  // obtenemos el topic global desde Zustand
  const { topic } = useCounterStore();

  // hook con el topic global
  const { data, isLoading, error, isError } = useEducationalContent(
    topic?.replace(/\s+/g, " ").trim()
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {isLoading && <LoadingState />}
        {isError && <ErrorState error={error} />}
        {data && <ContentCarousel data={data} searchTopic={topic} />}
        {!isLoading && !isError && !data && topic && (
          <EmptyState searchTopic={topic} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  container: {
    flex: 1,
  },
});
