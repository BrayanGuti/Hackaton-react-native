import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ErrorState = ({ error }) => (
  <View style={styles.centerContainer}>
    <Text style={styles.errorIcon}>⚠️</Text>
    <Text style={styles.errorText}>No pudimos cargar el contenido</Text>
    <Text style={styles.errorDetail}>
      {error?.message || "Verifica tu conexión e intenta nuevamente"}
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
  errorIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ff3b30",
    textAlign: "center",
    marginBottom: 8,
  },
  errorDetail: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
  },
});

export default ErrorState;
