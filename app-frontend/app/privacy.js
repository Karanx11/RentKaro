import { View, Text, StyleSheet, ScrollView } from "react-native";
import TopBar from "../src/components/TopBar";

export default function PrivacyScreen() {
  return (
    <View style={styles.container}>
      <TopBar title="Privacy Policy" />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Privacy Policy</Text>

        <Text style={styles.text}>
          Your privacy is important to us. This policy explains how RentKaro
          collects, uses, and protects your information.
        </Text>

        <Text style={styles.subHeading}>1. Information We Collect</Text>
        <Text style={styles.text}>
          We collect personal information such as name, email, phone number,
          and KYC details for verification and security purposes.
        </Text>

        <Text style={styles.subHeading}>2. How We Use Data</Text>
        <Text style={styles.text}>
          Your data is used to provide better services, verify identity, process
          rentals, and improve user experience.
        </Text>

        <Text style={styles.subHeading}>3. Data Security</Text>
        <Text style={styles.text}>
          We implement industry-standard security measures to protect your data.
          Sensitive information is encrypted and securely stored.
        </Text>

        <Text style={styles.subHeading}>4. Data Sharing</Text>
        <Text style={styles.text}>
          We do not sell or share your personal data with third parties except
          when required by law or for service functionality.
        </Text>

        <Text style={styles.footer}>
          Last updated: June 2025
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  content: {
    padding: 16,
    paddingBottom: 120,
  },

  heading: {
    fontSize: 22,
    fontWeight: "900",
    color: "#C76A46",
    marginBottom: 12,
  },

  subHeading: {
    fontSize: 16,
    fontWeight: "800",
    color: "#fff",
    marginTop: 16,
    marginBottom: 6,
  },

  text: {
    color: "#aaa",
    fontSize: 14,
    lineHeight: 22,
  },

  footer: {
    marginTop: 30,
    color: "#777",
    fontSize: 12,
    textAlign: "center",
  },
});
