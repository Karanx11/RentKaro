import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import TopBar from "../../src/components/TopBar";

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TopBar />

      <ScrollView contentContainerStyle={styles.content}>
        {/* PROFILE CARD */}
        <View style={styles.profileCard}>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=12" }}
            style={styles.avatar}
          />

          <Text style={styles.name}>Karan Sharma</Text>
          <Text style={styles.email}>karan@example.com</Text>

          {/* EDIT PROFILE NAVIGATION */}
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => router.push("/edit-profile")}
          >
            <Ionicons name="create-outline" size={18} color="#000" />
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* CONTACT DETAILS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Details</Text>

          <View style={styles.row}>
            <Ionicons name="call-outline" size={18} color="#C76A46" />
            <Text style={styles.rowText}>+91 98765 43210</Text>
          </View>

          <View style={styles.row}>
            <Ionicons name="location-outline" size={18} color="#C76A46" />
            <Text style={styles.rowText}>
              21, MG Road, Andheri East, Mumbai, Maharashtra
            </Text>
          </View>
        </View>

        {/* STATS */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Listings</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Rented</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statValue}>₹4,520</Text>
            <Text style={styles.statLabel}>Earnings</Text>
          </View>
        </View>

        {/* QUICK ACTIONS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>

          <TouchableOpacity style={styles.actionItem}>
            <Ionicons name="cube-outline" size={20} color="#fff" />
            <Text style={styles.actionText}>My Listings</Text>
            <Ionicons name="chevron-forward" size={18} color="#777" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <Ionicons name="time-outline" size={20} color="#fff" />
            <Text style={styles.actionText}>Rental History</Text>
            <Ionicons name="chevron-forward" size={18} color="#777" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <Ionicons name="wallet-outline" size={20} color="#fff" />
            <Text style={styles.actionText}>Payments</Text>
            <Ionicons name="chevron-forward" size={18} color="#777" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem}>
            <Ionicons name="shield-checkmark-outline" size={20} color="#fff" />
            <Text style={styles.actionText}>Verification Status</Text>
            <Ionicons name="chevron-forward" size={18} color="#777" />
          </TouchableOpacity>
        </View>
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
    paddingBottom: 120,
  },

  profileCard: {
    alignItems: "center",
    padding: 20,
    margin: 16,
    backgroundColor: "#111",
    borderRadius: 20,
  },

  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 12,
  },

  name: {
    fontSize: 20,
    fontWeight: "800",
    color: "#fff",
  },

  email: {
    color: "#aaa",
    marginTop: 4,
  },

  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#C76A46",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 14,
  },

  editText: {
    marginLeft: 6,
    fontWeight: "700",
    color: "#000",
  },

  section: {
    marginHorizontal: 16,
    marginTop: 10,
    backgroundColor: "#111",
    borderRadius: 18,
    padding: 16,
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 12,
  },

  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },

  rowText: {
    marginLeft: 10,
    color: "#ddd",
    flex: 1,
    lineHeight: 20,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginTop: 10,
  },

  statBox: {
    flex: 1,
    backgroundColor: "#111",
    marginHorizontal: 4,
    padding: 14,
    borderRadius: 16,
    alignItems: "center",
  },

  statValue: {
    color: "#C76A46",
    fontWeight: "800",
    fontSize: 16,
  },

  statLabel: {
    color: "#aaa",
    marginTop: 4,
    fontSize: 12,
  },

  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#1a1a1a",
  },

  actionText: {
    flex: 1,
    marginLeft: 12,
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});
