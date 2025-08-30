import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";

const subjects = [
  { id: "1", name: "Matemáticas", color: "#4A90E2", icon: "📘" },
  { id: "2", name: "Lectura Crítica", color: "#50E3C2", icon: "📖" },
  { id: "3", name: "Sociales y Ciudadanas", color: "#F5A623", icon: "🌍" },
  { id: "4", name: "Ciencias Naturales", color: "#7ED321", icon: "🔬" },
  { id: "5", name: "Inglés", color: "#BD10E0", icon: "🗣️" },
];

export default function Dashboard() {
  const router = useRouter();

  const renderSubjectCard = ({ item }: any) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: item.color }]}
      onPress={() => router.push("/SelectSubject")}
    >
      <Text style={styles.icon}>{item.icon}</Text>
      <Text style={styles.cardText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* 🔝 Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.appName}>Gupi</Text>
      </View>

      {/* PREMIUM */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.premiumCard}>
          <Image
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" }}
            style={styles.premiumImage}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.premiumTitle}>Aprende más</Text>
            <Text style={styles.premiumText}>
              Vidas infinitas y acceso a preguntas pasadas
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* APRENDER */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Aprender</Text>
        <FlatList
          data={subjects}
          renderItem={renderSubjectCard}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* PRACTICAR */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Practicar</Text>
        <Text style={styles.sectionDescription}>
          Pon a prueba tus conocimientos con preguntas de práctica.
        </Text>
        <FlatList
          data={subjects}
          renderItem={renderSubjectCard}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  // 🔝 Top Bar
  topBar: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 20,
  },
  appName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  // 🔹 Premium
  section: {
    marginBottom: 30,
  },
  premiumCard: {
    backgroundColor: "#FFDD57",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  premiumImage: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  premiumTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  premiumText: {
    fontSize: 14,
    color: "#333",
  },
  // 🔹 Secciones
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  sectionDescription: {
    fontSize: 14,
    color: "#444",
    marginBottom: 10,
  },
  // 🔹 Cards de materias
  card: {
    width: 140,
    height: 140,
    borderRadius: 25,
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  cardText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  icon: {
    fontSize: 40,
  },
});
