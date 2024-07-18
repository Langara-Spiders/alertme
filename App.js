import * as Notifications from "expo-notifications";

import { useEffect, useState } from "react";
import { LogBox, SafeAreaView, StatusBar } from "react-native";
import { en, fr } from "./lang";

import { GluestackUIProvider } from "@gluestack-ui/themed";
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
    // axios language headers
    // need to change this later
    axios.defaults.headers.common["Accept-Language"] = "en-CA";
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // Notifications.registerRemoteNotifications();

    // Notifications.events().registerNotificationReceivedForeground(
    //   (notification, completion) => {
    //     console.log(
    //       "Notification received while app is in foreground:",
    //       notification
    //     );
    //     completion({ alert: true, sound: false, badge: false });
    //   }
    // );
  }, []);

  return (
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
  );
}
