import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TopBar from "../src/components/TopBar";

export default function ChangePasswordScreen() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const isValid =
    oldPassword.length > 0 &&
    newPassword.length >= 6 &&
    newPassword === confirmPassword;

  const handleSave = () => {
    console.log({
      oldPassword,
      newPassword,
    });
  };

  return (
    <View style={styles.container}>
      <TopBar title="Change Password" />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          {/* OLD PASSWORD */}
          <Text style={styles.label}>Current Password</Text>
          <View style={styles.inputRow}>
            <TextInput
              placeholder="Enter current password"
              placeholderTextColor="#777"
              secureTextEntry={!showOld}
              value={oldPassword}
              onChangeText={setOldPassword}
              style={styles.input}
            />
            <TouchableOpacity onPress={() => setShowOld(!showOld)}>
              <Ionicons
                name={showOld ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#aaa"
              />
            </TouchableOpacity>
          </View>

          {/* NEW PASSWORD */}
          <Text style={styles.label}>New Password</Text>
          <View style={styles.inputRow}>
            <TextInput
              placeholder="Enter new password"
              placeholderTextColor="#777"
              secureTextEntry={!showNew}
              value={newPassword}
              onChangeText={setNewPassword}
              style={styles.input}
            />
            <TouchableOpacity onPress={() => setShowNew(!showNew)}>
              <Ionicons
                name={showNew ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#aaa"
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.hint}>
            Password must be at least 6 characters
          </Text>

          {/* CONFIRM PASSWORD */}
          <Text style={styles.label}>Confirm New Password</Text>
          <View style={styles.inputRow}>
            <TextInput
              placeholder="Re-enter new password"
              placeholderTextColor="#777"
              secureTextEntry={!showConfirm}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={styles.input}
            />
            <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
              <Ionicons
                name={showConfirm ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#aaa"
              />
            </TouchableOpacity>
          </View>

          {/* SAVE */}
          <TouchableOpacity
            disabled={!isValid}
            onPress={handleSave}
            style={[
              styles.saveBtn,
              !isValid && { opacity: 0.5 },
            ]}
          >
            <Text style={styles.saveText}>Update Password</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
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

  card: {
    backgroundColor: "#111",
    margin: 16,
    borderRadius: 20,
    padding: 16,
  },

  label: {
    color: "#aaa",
    fontSize: 13,
    fontWeight: "600",
    marginTop: 14,
    marginBottom: 6,
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000",
    borderRadius: 14,
    paddingHorizontal: 14,
  },

  input: {
    flex: 1,
    color: "#fff",
    paddingVertical: 14,
    fontSize: 15,
  },

  hint: {
    color: "#777",
    fontSize: 12,
    marginTop: 6,
  },

  saveBtn: {
    marginTop: 28,
    backgroundColor: "#C76A46",
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: "center",
  },

  saveText: {
    color: "#000",
    fontSize: 17,
    fontWeight: "800",
  },
});
