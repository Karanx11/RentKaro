import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { usePathname } from "expo-router";

export default function TopBar({ onLogout }) {
  const pathname = usePathname();

  // 🔁 Route → Title mapping
  const getTitleFromRoute = () => {
    if (pathname === "/") return "Market";
    if (pathname.startsWith("/chats")) return "Chats";
    if (pathname.startsWith("/sell")) return "Sell";
    if (pathname.startsWith("/profile")) return "Profile";
    if (pathname.startsWith("/settings")) return "Settings";
    if (pathname.startsWith("/product")) return "Product";

    return "RentKaro";
  };

  return (
    <View style={styles.container}>
      {/* LEFT : BRAND */}
      <View style={styles.side}>
        <Text style={styles.brand}>RentKaro</Text>
      </View>

      {/* CENTER : AUTO PAGE TITLE */}
      <View style={styles.center}>
        <Text style={styles.title}>{getTitleFromRoute()}</Text>
      </View>

      {/* RIGHT : LOGOUT */}
      <View style={styles.sideRight}>
        <TouchableOpacity onPress={onLogout}>
          <Ionicons name="log-out-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    paddingTop: 32,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000",
  },

  side: {
    width: 100,
    justifyContent: "center",
  },

  sideRight: {
    width: 100,
    alignItems: "flex-end",
    justifyContent: "center",
  },

  center: {
    flex: 1,
    alignItems: "center",
  },

  brand: {
    color: "#C76A46",
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 1.2,
  },

  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});
