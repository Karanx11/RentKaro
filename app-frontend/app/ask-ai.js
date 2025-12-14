import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import TopBar from "../src/components/TopBar";

export default function AskAIScreen() {
  const [messages, setMessages] = useState([
    { id: "1", from: "bot", text: "Hi! I'm Kokkie 🤖 How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), from: "user", text: input },
      {
        id: Math.random().toString(),
        from: "bot",
        text: "Kokkie is thinking… 🧠",
      },
    ]);

    setInput("");
  };

  return (
    <View style={styles.container}>
      <TopBar />

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chat}
        renderItem={({ item }) => (
          <View
            style={[
              styles.bubble,
              item.from === "user" ? styles.user : styles.bot,
            ]}
          >
            <Text
              style={[
                styles.text,
                item.from === "user" && { color: "#fff" },
              ]}
            >
              {item.text}
            </Text>
          </View>
        )}
      />

      {/* INPUT */}
      <View style={styles.inputBar}>
        <TextInput
          placeholder="Ask Kokkie…"
          placeholderTextColor="#777"
          value={input}
          onChangeText={setInput}
          style={styles.input}
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <Ionicons name="send" size={22} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  chat: {
    padding: 16,
    paddingBottom: 100,
  },
  bubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 16,
    marginBottom: 10,
  },
  bot: {
    backgroundColor: "#111",
    alignSelf: "flex-start",
  },
  user: {
    backgroundColor: "#C76A46",
    alignSelf: "flex-end",
  },
  text: {
    color: "#ddd",
    fontSize: 15,
  },
  inputBar: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    backgroundColor: "#111",
    padding: 10,
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: "#222",
  },
  input: {
    flex: 1,
    backgroundColor: "#000",
    color: "#fff",
    padding: 12,
    borderRadius: 14,
    marginRight: 8,
  },
  sendBtn: {
    backgroundColor: "#C76A46",
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: "center",
    alignItems: "center",
  },
});
