import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const SearchHeader = ({ topic, setTopic, onSearch, isLoading }) => (
  <View style={styles.header}>
    <Text style={styles.title}>Contenido Educativo ICFES</Text>
    <Text style={styles.subtitle}>Desliza para explorar cada tema</Text>

    <View style={styles.searchContainer}>
      <TextInput
        style={styles.input}
        value={topic}
        onChangeText={setTopic}
        placeholder="Busca un tema (ej: matemáticas, física, química...)"
        placeholderTextColor="#999"
        returnKeyType="search"
        onSubmitEditing={onSearch}
      />
      <TouchableOpacity
        style={[
          styles.searchButton,
          (!topic.trim() || isLoading) && styles.searchButtonDisabled,
        ]}
        onPress={onSearch}
        disabled={!topic.trim() || isLoading}
      >
        <Text style={styles.searchButtonText}>
          {isLoading ? "..." : "Buscar"}
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1a1a1a",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 22,
  },
  searchContainer: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#333",
  },
  searchButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 24,
    height: 48,
    justifyContent: "center",
    borderRadius: 12,
    minWidth: 80,
  },
  searchButtonDisabled: {
    backgroundColor: "#ccc",
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },
});

export default SearchHeader;
