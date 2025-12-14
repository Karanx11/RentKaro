import { Tabs } from "expo-router";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { isAuthenticated } from "../../src/utils/auth";

export default function TabLayout() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      try {
        const loggedIn = await isAuthenticated();

        if (!loggedIn) {
          if (mounted) {
            setCheckingAuth(false);
            router.replace("/login");
          }
        } else {
          if (mounted) {
            setCheckingAuth(false);
          }
        }
      } catch (e) {
        console.log("Auth check error:", e);
        setCheckingAuth(false);
        router.replace("/login");
      }
    };

    checkAuth();

    return () => {
      mounted = false;
    };
  }, []);

  // 🔄 LOADING
  if (checkingAuth) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#C76A46" />
      </View>
    );
  }

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
  loader: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },

  tabBar: {
    position: "absolute",
    height: 78,
    paddingBottom: 10,
    paddingTop: 8,
    borderTopWidth: 0,
    backgroundColor: "#000",
  },

  centerButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#1a1a1a",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 26,
    elevation: 10,
  },

  centerButtonActive: {
    backgroundColor: "#C76A46",
  },
});
