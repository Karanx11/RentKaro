import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import TopBar from "../../src/components/TopBar";

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <TopBar onLogout={() => console.log("Logout")} />

      <ScrollView contentContainerStyle={styles.container}>
        {/* PROFILE CARD */}
        <BlurView intensity={40} tint="light" style={styles.profileCard}>
          <Image
            source={require("../assets/profile.png")}
            style={styles.avatar}
          />

          <View style={{ alignItems: "center" }}>
            <Text style={styles.name}>Karan Sharma</Text>
            <Text style={styles.subText}>Joined: Jan 2025</Text>
            <Text style={styles.subText}>karan@example.com</Text>

            <TouchableOpacity
              style={styles.editBtn}
              onPress={() => router.push("/edit-profile")}
            >
              <Ionicons name="create-outline" size={18} color="#fff" />
              <Text style={styles.editBtnText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 120,
  },
  profileCard: {
    padding: 24,
    borderRadius: 24,
    alignItems: "center",
    backgroundColor: "rgba(200,200,200,0.4)",
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: "#fff",
    marginBottom: 16,
  },
  name: {
    fontSize: 26,
    fontWeight: "800",
    color: "#000",
  },
  subText: {
    color: "#333",
    marginTop: 4,
  },
  editBtn: {
    marginTop: 16,
    backgroundColor: "#000",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  editBtnText: {
    color: "#fff",
    fontWeight: "600",
  },
});
