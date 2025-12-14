import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function KokkieButton() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { id: "1", from: "bot", text: "Hi! I’m Kokkie 🤖 How can I help you today?" },
  ]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      from: "user",
      text: input,
    };

    const botMsg = {
      id: (Date.now() + 1).toString(),
      from: "bot",
      text: "Kokkie is learning… I’ll answer smarter soon 😉",
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  return (
    <>
      {/* 💬 CHAT BOX */}
      {open && (
        <View style={styles.chatBox}>
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Kokkie</Text>
            <TouchableOpacity onPress={() => setOpen(false)}>
              <Ionicons name="close" size={22} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* MESSAGES */}
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.messages}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.bubble,
                  item.from === "user"
                    ? styles.userBubble
                    : styles.botBubble,
                ]}
              >
                <Text
                  style={[
                    styles.bubbleText,
                    item.from === "user" && { color: "#fff" },
                  ]}
                >
                  {item.text}
                </Text>
              </View>
            )}
          />

          {/* INPUT */}
          <View style={styles.inputRow}>
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Ask Kokkie..."
              placeholderTextColor="#777"
              style={styles.input}
            />
            <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
              <Ionicons name="send" size={20} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/*  FLOATING BUTTON */}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setOpen(true)}
        style={styles.fab}
      >
        <Image
          source={require("../../assets/images/ChatBot.png")}
          style={styles.botImage}
        />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  /* FLOATING BUTTON */
  fab: {
    position: "absolute",
    bottom: 110,
    right: 20,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
  },

  botImage: {
    width: "100%",
    height: "100%",
    borderRadius: 32,
  },

  /* CHAT BOX */
  chatBox: {
    position: "absolute",
    bottom: 180,
    right: 20,
    width: 300,
    height: 420,
    backgroundColor: "#111",
    borderRadius: 20,
    overflow: "hidden",
    elevation: 15,
  },

  header: {
    height: 52,
    backgroundColor: "#000",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
  },

  headerTitle: {
    color: "#C76A46",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 1,
  },

  messages: {
    padding: 12,
  },

  bubble: {
    maxWidth: "80%",
    padding: 10,
    borderRadius: 14,
    marginBottom: 10,
  },

  botBubble: {
    backgroundColor: "#1e1e1e",
    alignSelf: "flex-start",
  },

  userBubble: {
    backgroundColor: "#C76A46",
    alignSelf: "flex-end",
  },

  bubbleText: {
    color: "#ddd",
    fontSize: 14,
  },

  inputRow: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#222",
  },

  input: {
    flex: 1,
    backgroundColor: "#000",
    borderRadius: 20,
    paddingHorizontal: 14,
    color: "#fff",
    fontSize: 14,
  },

  sendBtn: {
    marginLeft: 8,
    backgroundColor: "#C76A46",
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
  },
});
