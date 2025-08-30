import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { useRouter } from "expo-router";

const subjects = [
  { 
    id: "1", 
    name: "Matemáticas", 
    color: "#667EEA", 
    icon: "📘"
  },
  { 
    id: "2", 
    name: "Lectura Crítica", 
    color: "#764BA2", 
    icon: "📖"
  },
  { 
    id: "3", 
    name: "Sociales y Ciudadanas", 
    color: "#F093FB", 
    icon: "🌍"
  },
  { 
    id: "4", 
    name: "Ciencias Naturales", 
    color: "#4FACFE", 
    icon: "🔬"
  },
  { 
    id: "5", 
    name: "Inglés", 
    color: "#43E97B", 
    icon: "🗣️"
  },
];

export default function Dashboard() {
  const router = useRouter();

  const handleSubjectPress = (subject: any) => {
    // Navigate to AboutScreen with subject parameter
    router.push({
      pathname: "/AboutScreen",
      params: { selectedSubject: subject.name }
    });
  };

  const renderSubjectCard = ({ item }: any) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: item.color }]}
      onPress={() => handleSubjectPress(item)}
      activeOpacity={0.8}
    >
      <View style={styles.cardContent}>
        <Text style={styles.icon}>{item.icon}</Text>
        <Text style={styles.cardText}>{item.name}</Text>
      </View>
      <View style={styles.cardGradientOverlay} />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Section */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>¡Hola! 👋</Text>
          <Text style={styles.subGreeting}>¿Qué quieres aprender hoy?</Text>
        </View>
        <View style={styles.logoContainer}>
          <Text style={styles.appName}>Gupi</Text>
        </View>
      </View>

      {/* Premium Section */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.premiumCard}>
          <View style={styles.premiumContent}>
            <View style={styles.premiumIconContainer}>
              <Text style={styles.premiumIcon}>⭐</Text>
            </View>
            <View style={styles.premiumTextContainer}>
              <Text style={styles.premiumTitle}>Desbloquea Premium</Text>
              <Text style={styles.premiumText}>
                Vidas infinitas, estadísticas detalladas y acceso completo a preguntas
              </Text>
            </View>
            <View style={styles.premiumArrow}>
              <Text style={styles.arrowIcon}>→</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* Learning Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Aprender</Text>
          <Text style={styles.sectionSubtitle}>Domina nuevos conceptos</Text>
        </View>
        <FlatList
          data={subjects}
          renderItem={renderSubjectCard}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardsList}
        />
      </View>

      {/* Practice Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Practicar</Text>
          <Text style={styles.sectionSubtitle}>Pon a prueba tus conocimientos</Text>
        </View>
        <FlatList
          data={subjects}
          renderItem={renderSubjectCard}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardsList}
        />
      </View>

      {/* Bottom Spacing */}
      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  
  // Header Styles
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 32,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 4,
  },
  subGreeting: {
    fontSize: 16,
    color: "#64748B",
    fontWeight: "500",
  },
  logoContainer: {
    backgroundColor: "#667EEA",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  appName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  // Premium Card Styles
  section: {
    marginBottom: 32,
    paddingHorizontal: 24,
  },
  premiumCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#667EEA",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  premiumContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  premiumIconContainer: {
    width: 56,
    height: 56,
    backgroundColor: "#FEF3C7",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  premiumIcon: {
    fontSize: 24,
  },
  premiumTextContainer: {
    flex: 1,
  },
  premiumTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 4,
  },
  premiumText: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 20,
  },
  premiumArrow: {
    width: 32,
    height: 32,
    backgroundColor: "#F1F5F9",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  arrowIcon: {
    fontSize: 16,
    fontWeight: "600",
    color: "#475569",
  },

  // Section Headers
  sectionHeader: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 15,
    color: "#64748B",
    fontWeight: "500",
  },

  // Cards List
  cardsList: {
    paddingRight: 24,
  },

  // Subject Cards
  card: {
    width: 180,
    height: 160,
    borderRadius: 24,
    marginRight: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 16,
    elevation: 6,
    overflow: "hidden",
    position: "relative",
  },
  cardContent: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  cardGradientOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    zIndex: 1,
  },
  cardText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 12,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  icon: {
    fontSize: 48,
  },

  // Bottom Spacing
  bottomSpacing: {
    height: 32,
  },
});