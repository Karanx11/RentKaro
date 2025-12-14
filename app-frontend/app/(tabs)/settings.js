import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import TopBar from "../../src/components/TopBar";
import { logout } from "../../src/utils/auth";

export default function SettingsScreen() {
  const router = useRouter();
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = async () => {
    await logout();
    setShowLogout(false);
    router.replace("/login");
  };

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
            onPress={() => router.push("/forgot-password")}
          />
        </View>

        {/* SUPPORT */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>

          <SettingItem
            icon="help-circle-outline"
            label="Help & Support"
            onPress={() => router.push("/help-support")}
          />

          <SettingItem
            icon="document-text-outline"
            label="Terms & Conditions"
            onPress={() => router.push("/terms")}
          />

          <SettingItem
            icon="shield-checkmark-outline"
            label="Privacy Policy"
            onPress={() => router.push("/privacy")}
          />
        </View>


        {/* LOGOUT */}
        <View style={styles.logoutSection}>
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={() => setShowLogout(true)}
          >
            <Ionicons name="log-out-outline" size={20} color="#fff" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* LOGOUT CONFIRMATION MODAL */}
      <Modal visible={showLogout} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Ionicons
              name="log-out-outline"
              size={34}
              color="#C76A46"
            />

            <Text style={styles.modalTitle}>Logout</Text>
            <Text style={styles.modalText}>
              Are you sure you want to logout?
            </Text>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setShowLogout(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmBtn}
                onPress={handleLogout}
              >
                <Text style={styles.confirmText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

/* SETTING ITEM */
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

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    width: "80%",
    backgroundColor: "#111",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#fff",
    marginTop: 10,
  },

  modalText: {
    color: "#aaa",
    textAlign: "center",
    marginVertical: 10,
  },

  modalActions: {
    flexDirection: "row",
    marginTop: 20,
    gap: 12,
  },

  cancelBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#333",
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
  },

  cancelText: {
    color: "#fff",
    fontWeight: "700",
  },

  confirmBtn: {
    flex: 1,
    backgroundColor: "#C76A46",
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
  },

  confirmText: {
    color: "#000",
    fontWeight: "800",
  },
});
