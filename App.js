import * as Notifications from "expo-notifications";

import { useEffect, useState } from "react";
import { LogBox, SafeAreaView, StatusBar } from "react-native";
import { en, fr } from "./lang";

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
};

export default function App() {
  const [locale, setLocale] = useState("en");
  const { getUser } = useStore();
  const { token } = getUser();

  useEffect(() => {
    axios.defaults.headers.common["Accept-Language"] = "en-CA";
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }, []);

  return (
    <NavigationContainer>
      <IntlProvider
        messages={messages[locale]}
        locale={locale}
        defaultLocale="en"
      >
        <UpdateProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <GluestackUIProvider config={configLight}>
              <StatusBar barStyle="light-content" backgroundColor="#FF6B00" />
              <RootNavigator />
            </GluestackUIProvider>
          </SafeAreaView>
        </UpdateProvider>
      </IntlProvider>
    </NavigationContainer>
  );
}
