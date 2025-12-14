import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { login } from "../src/utils/auth";

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return;

    setLoading(true);

    // 🔐 later replace with API call
    await login();

    setLoading(false);
    router.replace("/(tabs)");
  };

  return (
    <View style={styles.container}>
      {/* LOGO / TITLE */}
      <Text style={styles.logo}>RentKaro</Text>
      <Text style={styles.subtitle}>Rent smart. Save more.</Text>

      {/* EMAIL */}
      <TextInput
        placeholder="Email"
        placeholderTextColor="#777"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      {/* PASSWORD */}
      <TextInput
        placeholder="Password"
        placeholderTextColor="#777"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* LOGIN BUTTON */}
      <TouchableOpacity
        style={[styles.loginBtn, loading && { opacity: 0.6 }]}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.loginText}>
          {loading ? "Logging in..." : "Login"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/forgot-password")}>
        <Text style={{ color: "#aaa", textAlign: "center", marginTop: 14 }}>
          Forgot Password?
        </Text>
      </TouchableOpacity>


      {/* SIGNUP */}
      <TouchableOpacity onPress={() => router.push("/signup")}>
        <Text style={styles.signupText}>
          Don’t have an account?{" "}
          <Text style={{ color: "#C76A46", fontWeight: "700" }}>
            Sign up
          </Text>
        </Text>
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

  logo: {
    fontSize: 34,
    fontWeight: "900",
    color: "#C76A46",
    textAlign: "center",
    marginBottom: 6,
  },

  subtitle: {
    color: "#aaa",
    textAlign: "center",
    marginBottom: 40,
  },

  input: {
    backgroundColor: "#111",
    color: "#fff",
    padding: 14,
    borderRadius: 14,
    marginBottom: 14,
    fontSize: 16,
  },

  loginBtn: {
    backgroundColor: "#C76A46",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
  },

  loginText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "800",
  },

  signupText: {
    color: "#aaa",
    textAlign: "center",
    marginTop: 20,
  },
});
