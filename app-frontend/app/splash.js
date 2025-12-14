import { View, Text, StyleSheet } from "react-native";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
} from "react-native-reanimated";

export default function Splash() {
  const router = useRouter();

  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);
  const translateY = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 700 });
    scale.value = withSequence(
      withTiming(1.05, { duration: 600 }),
      withTiming(1, { duration: 300 })
    );

    setTimeout(() => {
      translateY.value = withTiming(-120, { duration: 500 });
      setTimeout(() => router.replace("/(tabs)"), 400);
    }, 1500);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }, { translateY: translateY.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.logo, animatedStyle]}>
        𝓡𝓮𝓷𝓽𝓚𝓪𝓻𝓸
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    fontFamily: "RentKaroScript",
    fontSize: 36,
    color: "#C76A46",
  },
});
