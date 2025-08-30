import React from "react";
import { StyleSheet, Text, View } from "react-native";

const EmptyState = ({ searchTopic }) => (
  <View style={styles.centerContainer}>
    <Text style={styles.emptyIcon}>🔍</Text>
    <Text style={styles.emptyTitle}>Sin resultados</Text>
    <Text style={styles.emptyText}>
      No encontramos contenido para "{searchTopic}"
    </Text>
    <Text style={styles.emptyHint}>
      Intenta con: matemáticas, física, química, biología
    </Text>
  </View>
);

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 8,
  },
  emptyHint: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    fontStyle: "italic",
  },
});

export default EmptyState;
