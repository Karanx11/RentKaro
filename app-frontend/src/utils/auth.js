import AsyncStorage from "@react-native-async-storage/async-storage";

const AUTH_KEY = "isLoggedIn";

export const login = async () => {
  await AsyncStorage.setItem(AUTH_KEY, "true");
};

export const logout = async () => {
  await AsyncStorage.removeItem(AUTH_KEY);
};

export const isAuthenticated = async () => {
  const value = await AsyncStorage.getItem(AUTH_KEY);
  return value === "true";
};
