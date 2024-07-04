import { Text, View } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { configDark, configLight } from "../config/gluestack-ui.config";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { FormattedMessage } from "react-intl";
import { StyleSheet } from "react-native";
import { ModeSwitch } from "../components/atoms";

const Appearance = ({ onThemeChange }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem("theme");
      if (savedTheme) {
        const isDark = savedTheme === "dark";
        setIsDarkMode(isDark);
        onThemeChange(isDark ? configDark : configLight);
      }
    };

    loadTheme();
  }, []);

  const handleModeChange = async (value) => {
    setIsDarkMode(value);
    onThemeChange(value ? configDark : configLight);
    await AsyncStorage.setItem("theme", value ? "dark" : "light");
  };

  return (
    <View style={styles.container}>
      <View style={styles.innercontainer}>
        <Text>
          <FormattedMessage
            id="Appearance.title.message"
            defaultMessage="App Mode"
          />
        </Text>
        <ModeSwitch isDarkMode={isDarkMode} onValueChange={handleModeChange} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#fff",
  },
  innercontainer: {
    margin: 10,
    borderRadius: 10,
    backgroundColor: "#F1F1F1",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default Appearance;
