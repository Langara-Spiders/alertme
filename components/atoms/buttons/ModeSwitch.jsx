import { Button, Text, View } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet } from "react-native";

const ModeSwitch = ({ isDarkMode, onValueChange }) => {
  const [isDark, setIsDark] = useState(isDarkMode);

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem("theme");
      if (savedTheme) {
        const isDark = savedTheme === "dark";
        setIsDark(isDark);
        onValueChange(isDark);
      }
    };

    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    onValueChange(newTheme);
    await AsyncStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  return (
    <View style={styles.switchContainer}>
      <Button
        style={[
          styles.button,
          !isDark && styles.activeButton,
          isDark && styles.inactiveButton,
        ]}
        onPress={toggleTheme}
      >
        <Text
          style={[
            styles.label,
            !isDark ? styles.activeLabel : styles.inactiveLabel,
          ]}
        >
          Light
        </Text>
      </Button>
      <Button
        style={[
          styles.button,
          isDark && styles.activeButton,
          !isDark && styles.inactiveButton,
        ]}
        onPress={toggleTheme}
      >
        <Text
          style={[
            styles.label,
            isDark ? styles.activeLabel : styles.inactiveLabel,
          ]}
        >
          Dark
        </Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 160,
    height: 40,
    backgroundColor: "#e0e0e0",
    borderRadius: 25,
    padding: 5,
    position: "relative",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    borderRadius: 25,
  },
  activeButton: {
    backgroundColor: "#ff6f00",
  },
  inactiveButton: {
    backgroundColor: "transparent",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
  },
  activeLabel: {
    color: "#fff",
  },
  inactiveLabel: {
    color: "#888",
  },
});

export default ModeSwitch;
