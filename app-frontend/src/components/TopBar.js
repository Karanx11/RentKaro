import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";

export default function TopBar({ title = "RentKaro", onLogout }) {
  return (
    <BlurView intensity={40} tint="light" style={styles.container}>
      <TouchableOpacity onPress={onLogout} style={styles.left}>
        <Ionicons name="log-out-outline" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      {/* Right spacer to keep title centered */}
      <View style={styles.right} />
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    paddingTop: 30,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(200,200,200,0.35)",
  },
  left: {
    width: 40,
  },
  right: {
    width: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#000",
  },
});
