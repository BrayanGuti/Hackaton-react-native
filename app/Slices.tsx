import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import ContentCarousel from "../src/components/ContentCarousel";
import EmptyState from "../src/components/EmptyState";
import ErrorState from "../src/components/ErrorState";
import LoadingState from "../src/components/LoadingState";
import SearchHeader from "../src/components/SearchHeader";
import { useEducationalContent } from "../src/hooks/useEducationalContent";

export default function AboutScreen() {
  const [topic, setTopic] = useState("");
  const [searchTopic, setSearchTopic] = useState("");

  const { data, isLoading, error, isError } =
    useEducationalContent(searchTopic);

  const handleSearch = () => {
    if (topic.trim()) {
      setSearchTopic(topic.trim());
    }
  };

  return (
    <View style={styles.container}>
      <SearchHeader
        topic={topic}
        setTopic={setTopic}
        onSearch={handleSearch}
        isLoading={isLoading}
      />

      {isLoading && <LoadingState />}
      {isError && <ErrorState error={error} />}
      {data && <ContentCarousel data={data} searchTopic={searchTopic} />}
      {!isLoading && !isError && !data && searchTopic && (
        <EmptyState searchTopic={searchTopic} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
});
