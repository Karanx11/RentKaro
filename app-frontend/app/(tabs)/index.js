import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TopBar from "../../src/components/TopBar";

const CATEGORIES = [
  "All",
  "Camera",
  "Tools",
  "Electronics",
  "Furniture",
  "Vehicles",
];

const PRODUCTS = [
  {
    id: "1",
    name: "Canon DSLR Camera",
    pricePerDay: 800,
    location: "Delhi",
    category: "Camera",
    image:
      "https://images.pexels.com/photos/212372/pexels-photo-212372.jpeg",
  },
  {
    id: "2",
    name: "Electric Drill",
    pricePerDay: 150,
    location: "Pune",
    category: "Tools",
    image:
      "https://images.pexels.com/photos/2157293/pexels-photo-2157293.jpeg",
  },
  {
    id: "3",
    name: "Camping Tent",
    pricePerDay: 300,
    location: "Mumbai",
    category: "Furniture",
    image:
      "https://images.pexels.com/photos/618848/pexels-photo-618848.jpeg",
  },
];

export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("All");

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchName = p.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchLocation = p.location
      .toLowerCase()
      .includes(location.toLowerCase());
    const matchCategory =
      category === "All" || p.category === category;

    return matchName && matchLocation && matchCategory;
  });

  return (
    <View style={styles.container}>
      <TopBar />

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 120 }}
        ListHeaderComponent={() => (
          <>
            {/* HERO SECTION */}
            <View style={styles.hero}>
              <Image
                source={require("../assets/images/Home-Side.png")}
                style={styles.heroImage}
                resizeMode="contain"
              />

              <Text style={styles.heroTitle}>
                Rent <Text style={{ color: "#C76A46" }}>Smarter</Text>
              </Text>

              <Text style={styles.heroSubtitle}>
                Cameras, tools & electronics available near you
              </Text>
            </View>

            {/* SEARCH CARD */}
            <View style={styles.searchCard}>
              <View style={styles.searchInput}>
                <Ionicons name="search" size={20} color="#888" />
                <TextInput
                  placeholder="Search product"
                  placeholderTextColor="#777"
                  value={search}
                  onChangeText={setSearch}
                  style={styles.inputText}
                />
              </View>

              <View style={styles.searchInput}>
                <Ionicons name="location-outline" size={20} color="#888" />
                <TextInput
                  placeholder="Search location"
                  placeholderTextColor="#777"
                  value={location}
                  onChangeText={setLocation}
                  style={styles.inputText}
                />
              </View>

              <TouchableOpacity
                style={styles.searchBtn}
                onPress={() => Keyboard.dismiss()}
              >
                <Text style={styles.searchBtnText}>Search</Text>
              </TouchableOpacity>
            </View>

            {/* CATEGORY CHIPS */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.categoryRow}
            >
              {CATEGORIES.map((item) => (
                <TouchableOpacity
                  key={item}
                  onPress={() => setCategory(item)}
                  style={[
                    styles.categoryChip,
                    category === item && styles.categoryActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      category === item && { color: "#000" },
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={styles.sectionTitle}>
              Available Near You
            </Text>
          </>
        )}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />

            <View style={styles.cardBody}>
              <Text style={styles.cardTitle}>{item.name}</Text>

              <Text style={styles.price}>
                ₹{item.pricePerDay}
                <Text style={styles.per}> / day</Text>
              </Text>

              <Text style={styles.location}>
                📍 {item.location}
              </Text>

              <View style={styles.btnRow}>
                <TouchableOpacity style={styles.viewBtn}>
                  <Text style={styles.viewText}>View</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.rentBtn}>
                  <Text style={styles.rentText}>Rent</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            No products found
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  hero: {
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 10,
    paddingHorizontal: 16,
  },

  heroImage: {
    width: "100%",
    height: 220,
    marginBottom: 20,
  },

  heroTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: "#fff",
  },

  heroSubtitle: {
    marginTop: 8,
    fontSize: 15,
    color: "#aaa",
    textAlign: "center",
    maxWidth: 300,
  },

  searchCard: {
    margin: 16,
    padding: 14,
    backgroundColor: "#111",
    borderRadius: 18,
  },

  searchInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000",
    padding: 12,
    borderRadius: 14,
    marginBottom: 10,
  },

  inputText: {
    marginLeft: 8,
    color: "#fff",
    flex: 1,
  },

  searchBtn: {
    backgroundColor: "#C76A46",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  searchBtnText: {
    color: "#000",
    fontWeight: "700",
  },

  categoryRow: {
    paddingHorizontal: 16,
    marginBottom: 10,
  },

  categoryChip: {
    backgroundColor: "#1a1a1a",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },

  categoryActive: {
    backgroundColor: "#C76A46",
  },

  categoryText: {
    color: "#fff",
    fontWeight: "600",
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
    marginHorizontal: 16,
    marginVertical: 10,
  },

  card: {
    backgroundColor: "#111",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 18,
    overflow: "hidden",
  },

  cardImage: {
    height: 180,
    width: "100%",
  },

  cardBody: {
    padding: 14,
  },

  cardTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  price: {
    color: "#C76A46",
    marginTop: 4,
  },

  per: {
    color: "#888",
  },

  location: {
    color: "#888",
    marginTop: 4,
  },

  btnRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },

  viewBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#333",
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
  },

  viewText: {
    color: "#fff",
    fontWeight: "600",
  },

  rentBtn: {
    flex: 1,
    backgroundColor: "#C76A46",
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
  },

  rentText: {
    color: "#000",
    fontWeight: "700",
  },

  empty: {
    color: "#888",
    textAlign: "center",
    marginTop: 40,
  },
});
