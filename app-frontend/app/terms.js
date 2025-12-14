import { View, Text, StyleSheet, ScrollView } from "react-native";
import TopBar from "../src/components/TopBar";

export default function TermsScreen() {
  return (
    <View style={styles.container}>
      <TopBar title="Terms & Conditions" />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Terms & Conditions</Text>

        <Text style={styles.text}>
          Welcome to RentKaro. By using this application, you agree to comply
          with and be bound by the following terms and conditions.
        </Text>

        <Text style={styles.subHeading}>1. User Responsibility</Text>
        <Text style={styles.text}>
          You are responsible for maintaining the confidentiality of your
          account and all activities that occur under your account.
        </Text>

        <Text style={styles.subHeading}>2. Rentals & Listings</Text>
        <Text style={styles.text}>
          All items listed on RentKaro must be genuine, legal, and owned by the
          user. Any misuse or fraudulent listing may result in account
          suspension.
        </Text>

        <Text style={styles.subHeading}>3. Payments</Text>
        <Text style={styles.text}>
          RentKaro does not take responsibility for disputes between renters and
          owners. Payments are handled securely through supported gateways.
        </Text>

        <Text style={styles.subHeading}>4. Termination</Text>
        <Text style={styles.text}>
          We reserve the right to suspend or terminate accounts violating our
          policies without prior notice.
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
