import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#C76A46",
        tabBarInactiveTintColor: "#fff",
        tabBarLabelStyle: {
          fontSize: 11,
          marginBottom: 6,
          
        },
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="chats"
        options={{
          title: "Chats",
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbubble-outline" size={22} color={color} />
          ),
        }}
      />

      {/* CENTER PLUS BUTTON */}
      <Tabs.Screen
  name="sell"
  options={{
    title: "",
    tabBarIcon: ({ focused }) => (
      <View
        style={[
          styles.centerButton,
          focused && styles.centerButtonActive,
        ]}
      >
        <Ionicons
          name="add"
          size={32}
          color={focused ? "#000" : "#b0b0b0"}
        />
      </View>
    ),
  }}
/>


      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    height: 78,
    paddingBottom: 10,
    paddingTop: 8,
    borderTopWidth: 0,
    backgroundColor: "#000", // PURE BLACK
  },

  centerButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#1a1a1a", // dark grey base
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 26, // lifts the + button
    elevation: 10,
  },
});
