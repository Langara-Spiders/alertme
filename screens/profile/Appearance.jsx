import { Pressable, Text, View } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { configDark, configLight } from "../../config/gluestack-ui.config";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { FormattedMessage } from "react-intl";
import { StyleSheet } from "react-native";
import SvgUri from "react-native-svg-uri";
import Back_Icon from "../../assets/icons/System_Icons/ArrowLeft.svg";
import { ModeSwitch } from "../../components/atoms";

const Appearance = ({ onThemeChange }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigation = useNavigation();

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
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.navigate("Profile")}
          style={styles.iconContainer}
        >
          <SvgUri
            width="24"
            height="24"
            source={Back_Icon}
            style={styles.icon}
          />
        </Pressable>
        <Text style={styles.headerText}>
          <FormattedMessage
            id="profile.Appearance.headerText"
            defaultMessage="Appearance"
          />
        </Text>
      </View>
      <View style={styles.innercontainer}>
        <Text style={styles.textLang}>
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
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
    margin: 10,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: "#F3F4F4",
    opacity: 0.8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  icon: {
    width: 24,
    height: 24,
    textAlign: "center",
  },
  headerText: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  innercontainer: {
    margin: 10,
    borderRadius: 10,
    backgroundColor: "#F1F1F1",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textLang: {
    fontSize: 18,
  },
});

export default Appearance;
