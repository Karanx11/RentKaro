import { View, Text } from "react-native";
import TopBar from "../../src/components/TopBar";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <TopBar onLogout={() => console.log("Logout")} />

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Market / Home</Text>
      </View>
    </View>
  );
}
