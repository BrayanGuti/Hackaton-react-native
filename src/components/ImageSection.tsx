import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const ImageSection = ({ imagenes }) => {
  if (!imagenes || imagenes.length === 0) return null;

  return (
    <View style={styles.imagesContainer}>
      <Text style={styles.imagesTitle}>📸 Recursos ({imagenes.length})</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.imagesScroll}
      >
        {imagenes.map((imagen, imgIndex) => (
          <View key={imgIndex} style={styles.imageCard}>
            <Text style={styles.imageName} numberOfLines={1}>
              {imagen.nombre}
            </Text>
            <Text style={styles.imageData} numberOfLines={2}>
              {imagen.datos
                ? `${imagen.datos.substring(0, 60)}...`
                : "Imagen disponible"}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  imagesContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#f8f9ff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e6f0ff",
  },
  imagesTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007AFF",
    marginBottom: 12,
  },
  imagesScroll: {
    maxHeight: 80,
  },
  imageCard: {
    width: 120,
    marginRight: 12,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#007AFF",
  },
  imageName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  imageData: {
    fontSize: 11,
    color: "#666",
    fontStyle: "italic",
  },
});

export default ImageSection;
