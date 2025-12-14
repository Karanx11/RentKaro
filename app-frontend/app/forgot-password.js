import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleReset = () => {
    if (!email) return;

    // 🔐 later integrate email/OTP reset
    router.replace("/login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>
        Enter your email to reset your password
      </Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#777"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.btn} onPress={handleReset}>
        <Text style={styles.btnText}>Send Reset Link</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace("/login")}>
        <Text style={styles.backText}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#C76A46",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    color: "#aaa",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#111",
    color: "#fff",
    padding: 14,
    borderRadius: 14,
    marginBottom: 14,
    fontSize: 16,
  },
  btn: {
    backgroundColor: "#C76A46",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
  },
  btnText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "800",
  },
  backText: {
    color: "#aaa",
    textAlign: "center",
    marginTop: 20,
  },
});
