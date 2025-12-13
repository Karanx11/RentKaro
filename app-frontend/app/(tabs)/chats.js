import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import TopBar from "../../src/components/TopBar";

const DUMMY_CHATS = [
  {
    id: "1",
    name: "Amit Sharma",
    lastMessage: "Is the camera available tomorrow?",
    time: "2m ago",
    unread: 2,
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "2",
    name: "Neha Verma",
    lastMessage: "Can you reduce the price?",
    time: "1h ago",
    unread: 0,
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: "3",
    name: "Rahul Singh",
    lastMessage: "Thanks, I will book it.",
    time: "Yesterday",
    unread: 1,
    avatar: "https://i.pravatar.cc/150?img=3",
  },
];

export default function ChatScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TopBar />

      <FlatList
        data={DUMMY_CHATS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatCard}
            onPress={() => router.push(`/chat/${item.id}`)}
          >
            {/* Avatar */}
            <Image source={{ uri: item.avatar }} style={styles.avatar} />

            {/* Chat Info */}
            <View style={styles.chatInfo}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.message} numberOfLines={1}>
                {item.lastMessage}
              </Text>
            </View>

            {/* Right Info */}
            <View style={styles.right}>
              <Text style={styles.time}>{item.time}</Text>
              {item.unread > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.unread}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No chats yet</Text>
        }
      />
    </View>
  );
}

/* ✅ STYLES MUST BE OUTSIDE THE COMPONENT */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  list: {
    paddingBottom: 100,
  },

  chatCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#1a1a1a",
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 12,
  },

  chatInfo: {
    flex: 1,
  },

  name: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  message: {
    color: "#aaa",
    marginTop: 4,
    fontSize: 14,
  },

  right: {
    alignItems: "flex-end",
  },

  time: {
    color: "#777",
    fontSize: 12,
  },

  badge: {
    backgroundColor: "#C76A46",
    borderRadius: 12,
    minWidth: 22,
    height: 22,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 6,
  },

  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },

  empty: {
    color: "#888",
    textAlign: "center",
    marginTop: 40,
  },
});
