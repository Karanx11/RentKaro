import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import { logout } from "../utils/auth";

export default function TopBar() {
  const pathname = usePathname();
  const router = useRouter();

  const isHome =
    pathname === "/" ||
    pathname === "/index";

  // 🔁 Route → Page Title
  const getTitleFromRoute = () => {
    if (isHome) return "";

    if (pathname.startsWith("/chats")) return "Chats";
    if (pathname.startsWith("/sell")) return "Sell";
    if (pathname.startsWith("/profile")) return "Profile";
    if (pathname.startsWith("/settings")) return "Settings";
    if (pathname.startsWith("/edit-profile")) return "Edit Profile";
    if (pathname.startsWith("/change-password")) return "Change Password";
    if (pathname.startsWith("/help")) return "Help & Support";
    if (pathname.startsWith("/terms")) return "Terms & Conditions";
    if (pathname.startsWith("/privacy")) return "Privacy Policy";

    return <Text style={styles.brand}>RentKaro</Text>;
  };

  // 🔐 Logout
  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            await logout();
            router.replace("/login");
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* LEFT */}
      <View style={styles.side}>
        {isHome ? (
          <Text style={styles.brand}>RentKaro</Text>
        ) : (
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        )}
      </View>

      {/* CENTER */}
      <View style={styles.center}>
        {!isHome && (
          <Text style={styles.title}>{getTitleFromRoute()}</Text>
        )}
      </View>

      {/* RIGHT */}
      <View style={styles.sideRight}>
        {isHome && (
          <TouchableOpacity onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

/* STYLES */
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
    width: 80,
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
    fontFamily: "RentKaroScript",
    letterSpacing: 1.3,
  },

  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});
