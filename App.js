import { useEffect, useState } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { en, fr } from "./lang";

import { GluestackUIProvider } from "@gluestack-ui/themed";
import axios from "axios";
import { IntlProvider } from "react-intl";
import { LogBox } from "react-native";
import { Notifications } from "react-native-notifications";
import { configLight } from "./config/gluestack-ui.config";
import RootNavigator from "./navigation/RootNavigator";
import { NotificationProvider } from "./providers";
import { useStore } from "./store";

LogBox.ignoreAllLogs(); // suppress all warnings

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

    Notifications.registerRemoteNotifications();

    Notifications.events().registerNotificationReceivedForeground(
      (notification, completion) => {
        console.log(
          "Notification received while app is in foreground:",
          notification
        );
        completion({ alert: true, sound: false, badge: false });
      }
    );
  }, []);

  return (
    <IntlProvider
      messages={messages[locale]}
      locale={locale}
      defaultLocale="en"
    >
      <NotificationProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <GluestackUIProvider config={configLight}>
            <StatusBar barStyle="light-content" backgroundColor="#FF6B00" />
            <RootNavigator />
          </GluestackUIProvider>
        </SafeAreaView>
      </NotificationProvider>
    </IntlProvider>
  );
}
