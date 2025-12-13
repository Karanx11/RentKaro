import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import TopBar from "../../src/components/TopBar";

export default function SellScreen() {
  const [images, setImages] = useState([null, null, null]);
  const [mode, setMode] = useState("rent");
  const [sellPrice, setSellPrice] = useState("");
  const [productName, setProductName] = useState("");

  const MAX_DESC_LENGTH = 300;
  const [description, setDescription] = useState("");
  const [descHeight, setDescHeight] = useState(120);

  // IMAGE PICKER
  const pickImage = async (index) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      const updated = [...images];
      updated[index] = result.assets[0].uri;
      setImages(updated);
    }
  };

  // FORM VALIDATION
  const isFormValid = () => {
    const hasImages = images.every((img) => img !== null);
    const hasName = productName.trim().length > 0;
    const hasDescription = description.trim().length > 0;

    if (mode === "rent") {
      return hasImages && hasName && hasDescription;
    }

    return (
      hasImages &&
      hasName &&
      hasDescription &&
      sellPrice.trim().length > 0
    );
  };

  const handleSubmit = () => {
    console.log({
      images,
      productName,
      description,
      mode,
      sellPrice,
    });
  };

  return (
    <View style={styles.container}>
      <TopBar />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.title}>List Your Product</Text>
          <Text style={styles.subtitle}>
            Add product details and choose Rent or Sell
          </Text>

          {/* IMAGES */}
          <Text style={styles.sectionTitle}>Upload Images (3)</Text>
          <View style={styles.imageRow}>
            {images.map((img, index) => (
              <TouchableOpacity
                key={index}
                style={styles.imageBox}
                onPress={() => pickImage(index)}
              >
                {img ? (
                  <Image source={{ uri: img }} style={styles.image} />
                ) : (
                  <Ionicons name="image-outline" size={28} color="#aaa" />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* PRODUCT NAME */}
          <Text style={styles.sectionTitle}>Product Name</Text>
          <TextInput
            placeholder="e.g. DSLR Camera, Electric Drill"
            placeholderTextColor="#777"
            value={productName}
            onChangeText={setProductName}
            style={styles.input}
          />

          {/* DETAILS */}
          <Text style={styles.sectionTitle}>Product Details</Text>
          <TextInput
            placeholder="Describe product, condition, usage rules…"
            placeholderTextColor="#777"
            multiline
            value={description}
            onChangeText={(text) =>
              text.length <= MAX_DESC_LENGTH && setDescription(text)
            }
            onContentSizeChange={(e) =>
              setDescHeight(Math.max(120, e.nativeEvent.contentSize.height))
            }
            textAlignVertical="top"
            style={[styles.input, { height: descHeight }]}
          />
          <Text style={styles.counter}>
            {description.length}/{MAX_DESC_LENGTH}
          </Text>

          {/* PRICING */}
          <Text style={styles.sectionTitle}>Pricing</Text>

          {mode === "rent" ? (
            <View style={styles.priceRow}>
              <TextInput
                placeholder="Per Day"
                placeholderTextColor="#777"
                keyboardType="numeric"
                style={styles.priceInput}
              />
              <TextInput
                placeholder="Per Month"
                placeholderTextColor="#777"
                keyboardType="numeric"
                style={styles.priceInput}
              />
              <TextInput
                placeholder="Per Year"
                placeholderTextColor="#777"
                keyboardType="numeric"
                style={styles.priceInput}
              />
            </View>
          ) : (
            <TextInput
              placeholder="Selling Price"
              placeholderTextColor="#777"
              keyboardType="numeric"
              value={sellPrice}
              onChangeText={setSellPrice}
              style={styles.input}
            />
          )}

          {/* TOGGLE */}
          <Text style={styles.sectionTitle}>Choose Listing Type</Text>
          <View style={styles.toggleRow}>
            <ToggleButton
              label="Rent"
              active={mode === "rent"}
              onPress={() => setMode("rent")}
            />
            <ToggleButton
              label="Sell"
              active={mode === "sell"}
              onPress={() => setMode("sell")}
            />
          </View>

          {/* SUBMIT */}
          <TouchableOpacity
            disabled={!isFormValid()}
            onPress={handleSubmit}
            style={[
              styles.submitBtn,
              !isFormValid() && { opacity: 0.5 },
            ]}
          >
            <Text style={styles.submitText}>Submit Listing</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

/* TOGGLE BUTTON */
function ToggleButton({ label, active, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.toggleBtn,
        active && styles.toggleActive,
      ]}
    >
      <Text
        style={[
          styles.toggleText,
          active && { color: "#000" },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

/* STYLES */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  content: {
    padding: 16,
    paddingBottom: 120,
  },

  card: {
    backgroundColor: "#111",
    borderRadius: 20,
    padding: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
    color: "#fff",
  },

  subtitle: {
    textAlign: "center",
    color: "#aaa",
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 18,
    marginBottom: 8,
    color: "#fff",
  },

  imageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  imageBox: {
    width: 90,
    height: 90,
    borderRadius: 14,
    backgroundColor: "#1a1a1a",
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: "100%",
    height: "100%",
    borderRadius: 14,
  },

  input: {
    backgroundColor: "#000",
    borderRadius: 14,
    padding: 14,
    fontSize: 15,
    color: "#fff",
  },

  priceRow: {
    flexDirection: "row",
    gap: 10,
  },

  priceInput: {
    flex: 1,
    backgroundColor: "#000",
    borderRadius: 14,
    padding: 12,
    fontSize: 15,
    color: "#fff",
    textAlign: "center",
  },

  toggleRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginTop: 10,
  },

  toggleBtn: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: "#1a1a1a",
  },

  toggleActive: {
    backgroundColor: "#C76A46",
  },

  toggleText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },

  submitBtn: {
    marginTop: 30,
    backgroundColor: "#C76A46",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
  },

  submitText: {
    color: "#000",
    fontSize: 17,
    fontWeight: "800",
  },

  counter: {
    textAlign: "right",
    marginTop: 6,
    color: "#777",
    fontSize: 12,
  },
});
