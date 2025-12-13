import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import TopBar from "../src/components/TopBar";

export default function EditProfileScreen() {
  const [name, setName] = useState("Karan Sharma");
  const [email, setEmail] = useState("karan@example.com");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [address, setAddress] = useState(
    "21, MG Road, Andheri East, Mumbai, Maharashtra"
  );
  const [avatar, setAvatar] = useState(
    "https://i.pravatar.cc/150?img=12"
  );

  // Pick profile image
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    console.log({
      name,
      email,
      phone,
      address,
      avatar,
    });
  };

  return (
    <View style={styles.container}>
      <TopBar title="Edit Profile" />

      <ScrollView contentContainerStyle={styles.content}>
        {/* PROFILE IMAGE */}
        <View style={styles.avatarWrapper}>
          <Image source={{ uri: avatar }} style={styles.avatar} />

          <TouchableOpacity style={styles.cameraBtn} onPress={pickImage}>
            <Ionicons name="camera" size={18} color="#000" />
          </TouchableOpacity>
        </View>

        {/* FORM */}
        <View style={styles.card}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            style={styles.input}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={styles.input}
          />

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            style={styles.input}
          />

          <Text style={styles.label}>Address</Text>
          <TextInput
            value={address}
            onChangeText={setAddress}
            multiline
            textAlignVertical="top"
            style={[styles.input, { height: 100 }]}
          />

          {/* SAVE */}
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveText}>Save Changes</Text>
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

  avatarWrapper: {
    alignItems: "center",
    marginTop: 24,
    marginBottom: 16,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },

  cameraBtn: {
    position: "absolute",
    bottom: 0,
    right: "38%",
    backgroundColor: "#C76A46",
    padding: 8,
    borderRadius: 20,
  },

  card: {
    backgroundColor: "#111",
    marginHorizontal: 16,
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

  input: {
    backgroundColor: "#000",
    color: "#fff",
    borderRadius: 14,
    padding: 14,
    fontSize: 15,
  },

  saveBtn: {
    marginTop: 24,
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
