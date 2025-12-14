import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export default function KYCScreen() {
  const router = useRouter();

  const [aadhaar, setAadhaar] = useState("");
  const [pan, setPan] = useState("");
  const [address, setAddress] = useState("");

  const [aadhaarFront, setAadhaarFront] = useState(null);
  const [aadhaarBack, setAadhaarBack] = useState(null);
  const [panImage, setPanImage] = useState(null);

  const pickImage = async (setter) => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!res.canceled) {
      setter(res.assets[0].uri);
    }
  };

  const isValid =
    aadhaar.length === 12 &&
    address.length > 10 &&
    aadhaarFront &&
    aadhaarBack;

  const submitKYC = () => {
    if (!isValid) return;

    // 🔐 Send to backend later
    console.log({
      aadhaar,
      pan,
      address,
      aadhaarFront,
      aadhaarBack,
      panImage,
    });

    router.replace("/login");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>KYC Verification</Text>
      <Text style={styles.subtitle}>
        Complete verification to continue
      </Text>

      <TextInput
        placeholder="Aadhaar Number"
        placeholderTextColor="#777"
        keyboardType="numeric"
        maxLength={12}
        value={aadhaar}
        onChangeText={setAadhaar}
        style={styles.input}
      />

      <TextInput
        placeholder="PAN Number (Optional)"
        placeholderTextColor="#777"
        value={pan}
        onChangeText={setPan}
        style={styles.input}
      />

      <TextInput
        placeholder="Full Residential Address"
        placeholderTextColor="#777"
        value={address}
        onChangeText={setAddress}
        style={[styles.input, { height: 100 }]}
        multiline
      />

      {/* AADHAAR IMAGES */}
      <Text style={styles.section}>Upload Aadhaar</Text>

      <View style={styles.row}>
        <UploadBox
          label="Aadhaar Front"
          image={aadhaarFront}
          onPress={() => pickImage(setAadhaarFront)}
        />
        <UploadBox
          label="Aadhaar Back"
          image={aadhaarBack}
          onPress={() => pickImage(setAadhaarBack)}
        />
      </View>

      {/* PAN IMAGE */}
      <Text style={styles.section}>Upload PAN (Optional)</Text>

      <UploadBox
        label="PAN Card"
        image={panImage}
        onPress={() => pickImage(setPanImage)}
      />

      <TouchableOpacity
        style={[styles.btn, !isValid && { opacity: 0.5 }]}
        disabled={!isValid}
        onPress={submitKYC}
      >
        <Text style={styles.btnText}>Submit KYC</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

/* UPLOAD BOX */
function UploadBox({ label, image, onPress }) {
  return (
    <TouchableOpacity style={styles.uploadBox} onPress={onPress}>
      {image ? (
        <Image source={{ uri: image }} style={styles.uploadImg} />
      ) : (
        <>
          <Ionicons name="image-outline" size={28} color="#aaa" />
          <Text style={styles.uploadText}>{label}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

/* STYLES */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "900",
    marginBottom: 6,
  },
  subtitle: {
    color: "#aaa",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#111",
    color: "#fff",
    padding: 14,
    borderRadius: 14,
    marginBottom: 14,
    fontSize: 16,
  },
  section: {
    color: "#fff",
    fontWeight: "700",
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 14,
  },
  uploadBox: {
    flex: 1,
    height: 140,
    backgroundColor: "#111",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadImg: {
    width: "100%",
    height: "100%",
    borderRadius: 14,
  },
  uploadText: {
    color: "#aaa",
    marginTop: 6,
    fontSize: 13,
  },
  btn: {
    backgroundColor: "#C76A46",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
  },
  btnText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "800",
  },
});
