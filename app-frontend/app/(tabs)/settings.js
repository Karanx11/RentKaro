import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import TopBar from "../../src/components/TopBar";

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TopBar />

      <ScrollView contentContainerStyle={styles.content}>
        {/* ACCOUNT */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>

          <SettingItem
            icon="person-outline"
            label="Edit Profile"
            onPress={() => router.push("/edit-profile")}
          />

          <SettingItem
            icon="lock-closed-outline"
            label="Change Password"
            onPress={() => router.push("/change-password")}
          />
        </View>

        {/* SUPPORT */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>

          <SettingItem icon="help-circle-outline" label="Help & Support" />
          <SettingItem icon="document-text-outline" label="Terms & Conditions" />
          <SettingItem icon="shield-checkmark-outline" label="Privacy Policy" />
        </View>

        {/* LOGOUT */}
        <View style={styles.logoutSection}>
          <TouchableOpacity style={styles.logoutBtn}>
            <Ionicons name="log-out-outline" size={20} color="#fff" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

/* REUSABLE SETTING ITEM */
function SettingItem({ icon, label, onPress }) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Ionicons name={icon} size={20} color="#fff" />
      <Text style={styles.itemText}>{label}</Text>
      <Ionicons name="chevron-forward" size={18} color="#777" />
    </TouchableOpacity>
  );
}

/* STYLES */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  content: {
    paddingBottom: 120,
  },

  section: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: "#111",
    borderRadius: 18,
    paddingVertical: 8,
  },

  sectionTitle: {
    color: "#aaa",
    fontSize: 14,
    fontWeight: "700",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: "#1a1a1a",
  },

  itemText: {
    flex: 1,
    marginLeft: 14,
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },

  logoutSection: {
    marginTop: 30,
    alignItems: "center",
  },

  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#C76A46",
    paddingHorizontal: 26,
    paddingVertical: 14,
    borderRadius: 30,
  },

  logoutText: {
    color: "#000",
    fontWeight: "800",
    marginLeft: 8,
    fontSize: 16,
  },
});
