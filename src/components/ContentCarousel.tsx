import React, { useCallback, useRef, useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import ContentSlice from "./ContentSlice";
import EmptyState from "./EmptyState";
import NavigationControls from "./NavigationControls";

const { width } = Dimensions.get("window");
const SLICE_WIDTH = width - 40;

const ContentCarousel = ({ data, searchTopic }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  if (!data?.content || data.content.length === 0) {
    return <EmptyState searchTopic={searchTopic} />;
  }

  const handleNext = () => {
    if (currentIndex < data.content.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      flatListRef.current?.scrollToIndex({ index: prevIndex, animated: true });
    }
  };

  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }, []);

  const renderSlice = ({ item, index }) => (
    <ContentSlice
      slice={item}
      index={index}
      totalSlices={data.content.length}
    />
  );

  return (
    <View style={styles.carouselContainer}>
      <View style={styles.carouselHeader}>
        <Text style={styles.resultTitle}>📚 {searchTopic}</Text>
        <Text style={styles.swipeHint}>
          👆 Desliza horizontalmente para navegar
        </Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={data.content}
        renderItem={renderSlice}
        keyExtractor={(item, index) =>
          item.slice?.toString() || index.toString()
        }
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={SLICE_WIDTH + 20}
        decelerationRate="fast"
        contentContainerStyle={styles.flatListContent}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        getItemLayout={(data, index) => ({
          length: SLICE_WIDTH + 20,
          offset: (SLICE_WIDTH + 20) * index,
          index,
        })}
      />

      <NavigationControls
        currentIndex={currentIndex}
        totalSlices={data.content.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          ✅ Contenido oficial ICFES Saber 11
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    flex: 1,
  },
  carouselHeader: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  resultTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1a1a1a",
    textAlign: "center",
    marginBottom: 8,
  },
  swipeHint: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    backgroundColor: "#f0f8ff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  flatListContent: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  footer: {
    padding: 16,
    backgroundColor: "#e8f5e8",
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#2d6e2d",
    fontWeight: "500",
  },
});

export default ContentCarousel;
