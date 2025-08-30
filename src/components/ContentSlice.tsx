import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import ImageSection from "./ImageSection";

const { width, height } = Dimensions.get("window");
const SLICE_WIDTH = width - 40;
const SLICE_HEIGHT = height * 0.6;

const ContentSlice = ({ slice, index, totalSlices }) => (
  <View style={styles.sliceCard}>
    <View style={styles.sliceHeader}>
      <View style={styles.sliceIndicator}>
        <Text style={styles.sliceNumber}>{index + 1}</Text>
        <Text style={styles.sliceTotal}>/ {totalSlices}</Text>
      </View>

      {slice.titulo && <Text style={styles.sliceTitle}>{slice.titulo}</Text>}
    </View>

    <ScrollView
      style={styles.sliceContentScroll}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.sliceText}>{slice.texto}</Text>
      <ImageSection imagenes={slice.imagenes} />
    </ScrollView>

    {/* Indicadores de navegación */}
    <View style={styles.navigationDots}>
      {Array.from({ length: totalSlices }, (_, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            i === index ? styles.activeDot : styles.inactiveDot,
          ]}
        />
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  sliceCard: {
    width: SLICE_WIDTH,
    height: SLICE_HEIGHT,
    marginHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    borderLeftWidth: 6,
    borderLeftColor: "#007AFF",
  },
  sliceHeader: {
    marginBottom: 20,
    alignItems: "center",
  },
  sliceIndicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 16,
  },
  sliceNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  sliceTotal: {
    fontSize: 14,
    color: "#b3d9ff",
    marginLeft: 2,
  },
  sliceTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1a1a1a",
    textAlign: "center",
    lineHeight: 28,
  },
  sliceContentScroll: {
    flex: 1,
    marginBottom: 20,
  },
  sliceText: {
    fontSize: 16,
    color: "#444",
    lineHeight: 26,
    textAlign: "justify",
    marginBottom: 20,
  },
  navigationDots: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#007AFF",
    width: 20,
  },
  inactiveDot: {
    backgroundColor: "#d0d0d0",
  },
});

export default ContentSlice;
