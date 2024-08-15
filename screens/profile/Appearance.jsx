import { Pressable, Text, View } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet } from "react-native";
import { configDark, configLight } from "../../config/gluestack-ui.config";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { FormattedMessage } from "react-intl";
import BackIcon from "../../assets/icons/common_icons/arrow_left.png";
import { ModeSwitch } from "../../components/atoms";
import { useStore } from "../../store";

const Appearance = ({ onThemeChange }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigation = useNavigation();
  const { palette, setTheme, setPalette } = useStore();

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
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: palette.bg1,
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
      backgroundColor: palette.backButtonBg,
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
      color: palette.txt1,
    },
    innercontainer: {
      margin: 10,
      borderRadius: 10,
      backgroundColor: palette.backButtonBg,
      padding: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    textLang: {
      fontSize: 18,
      color: palette.txt1,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.navigate("Profile")}
          style={styles.iconContainer}
        >
          <Image source={BackIcon} style={styles.icon} />
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

export default Appearance;
