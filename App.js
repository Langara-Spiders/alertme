import * as Notifications from "expo-notifications";

import {
  PublicSans_400Regular,
  useFonts,
} from "@expo-google-fonts/public-sans";
import { useEffect } from "react";
import { LogBox, StatusBar } from "react-native";
import { en, fr, pa } from "./lang";

import { GluestackUIProvider } from "@gluestack-ui/themed";
import { NavigationContainer } from "@react-navigation/native";
import axios from "axios";
import { IntlProvider } from "react-intl";
import { configLight } from "./config/gluestack-ui.config";
import RootNavigator from "./navigation/RootNavigator";
import { UpdateProvider } from "./providers";
import { useStore } from "./store";

LogBox.ignoreAllLogs(); // suppress all warnings

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const messages = {
  en,
  fr,
  pa,
};

export default function App() {
  const { getUser, palette, theme, locale } = useStore();
  const { token } = getUser();
  const [fontsLoaded] = useFonts({
    PublicSans_400Regular,
  });

  useEffect(() => {
    axios.defaults.headers.common["Accept-Language"] = "en-CA";
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }, []);

  console.log(locale);

  return (
    <NavigationContainer>
      <IntlProvider
        messages={messages[locale]}
        locale={locale}
        defaultLocale="en"
      >
        <UpdateProvider>
          <GluestackUIProvider config={configLight}>
            <StatusBar
              barStyle={theme === "dark" ? "light-content" : "dark-content"}
              backgroundColor={palette.bg1}
            />
            <RootNavigator />
          </GluestackUIProvider>
        </UpdateProvider>
      </IntlProvider>
    </NavigationContainer>
  );
}
