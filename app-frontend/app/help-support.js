import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function HelpSupportScreen() {
  const router = useRouter();
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      q: "How does RentKaro work?",
      a: "RentKaro allows you to rent or lend items like cameras, tools, and electronics securely.",
    },
    {
      q: "Is KYC mandatory?",
      a: "Yes, KYC is required to ensure trust and safety for all users.",
    },
    {
      q: "How do I get my payment?",
      a: "Payments are transferred directly to your linked bank account after successful rental completion.",
    },
    {
      q: "What if an item is damaged?",
      a: "You can raise a support request and our team will assist you with resolution.",
    },
  ];

  return (
    <View style={styles.container}>
      {/* TOP BAR */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* CONTACT OPTIONS */}
        <Text style={styles.sectionTitle}>Contact Us</Text>

        <SupportItem icon="mail-outline" text="support@rentkaro.com" />
        <SupportItem icon="call-outline" text="+91 98765 43210" />
        <SupportItem icon="logo-whatsapp" text="Chat on WhatsApp" />

        {/* FAQ SECTION */}
        <Text style={styles.sectionTitle}>FAQs</Text>

        {faqs.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.faqBox}
            onPress={() =>
              setOpenFAQ(openFAQ === index ? null : index)
            }
          >
            <View style={styles.faqHeader}>
              <Text style={styles.faqQuestion}>{item.q}</Text>
              <Ionicons
                name={
                  openFAQ === index
                    ? "chevron-up-outline"
                    : "chevron-down-outline"
                }
                size={20}
                color="#C76A46"
              />
            </View>

            {openFAQ === index && (
              <Text style={styles.faqAnswer}>{item.a}</Text>
            )}
          </TouchableOpacity>
        ))}

        {/* REPORT ISSUE */}
        <Text style={styles.sectionTitle}>Need More Help?</Text>

        <TouchableOpacity style={styles.reportBtn}>
          <Text style={styles.reportText}>Report an Issue</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

/* SUPPORT ITEM */
function SupportItem({ icon, text }) {
  return (
    <View style={styles.supportItem}>
      <Ionicons name={icon} size={20} color="#C76A46" />
      <Text style={styles.supportText}>{text}</Text>
    </View>
  );
}

/* STYLES */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  header: {
    height: 80,
    paddingTop: 36,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#000",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },

  content: {
    padding: 16,
    paddingBottom: 120,
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    marginVertical: 14,
  },

  supportItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111",
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
  },

  supportText: {
    color: "#fff",
    marginLeft: 12,
    fontSize: 15,
    fontWeight: "600",
  },

  faqBox: {
    backgroundColor: "#111",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
  },

  faqHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  faqQuestion: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    flex: 1,
    paddingRight: 10,
  },

  faqAnswer: {
    color: "#aaa",
    marginTop: 10,
    lineHeight: 20,
  },

  reportBtn: {
    backgroundColor: "#C76A46",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
  },

  reportText: {
    color: "#000",
    fontWeight: "800",
    fontSize: 16,
  },
});
