import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const NavigationControls = ({
  currentIndex,
  totalSlices,
  onPrevious,
  onNext,
}) => (
  <View style={styles.navigationControls}>
    <TouchableOpacity
      style={[styles.navButton, currentIndex === 0 && styles.navButtonDisabled]}
      onPress={onPrevious}
      disabled={currentIndex === 0}
    >
      <Text
        style={[
          styles.navButtonText,
          currentIndex === 0 && styles.navButtonTextDisabled,
        ]}
      >
        ← Anterior
      </Text>
    </TouchableOpacity>

    <View style={styles.pageIndicator}>
      <Text style={styles.pageText}>
        {currentIndex + 1} de {totalSlices}
      </Text>
    </View>

    <TouchableOpacity
      style={[
        styles.navButton,
        currentIndex === totalSlices - 1 && styles.navButtonDisabled,
      ]}
      onPress={onNext}
      disabled={currentIndex === totalSlices - 1}
    >
      <Text
        style={[
          styles.navButtonText,
          currentIndex === totalSlices - 1 && styles.navButtonTextDisabled,
        ]}
      >
        Siguiente →
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  navigationControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  navButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    minWidth: 100,
  },
  navButtonDisabled: {
    backgroundColor: "#e0e0e0",
  },
  navButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
    textAlign: "center",
  },
  navButtonTextDisabled: {
    color: "#999",
  },
  pageIndicator: {
    backgroundColor: "#f0f8ff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e6f0ff",
  },
  pageText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#007AFF",
  },
});

export default NavigationControls;
