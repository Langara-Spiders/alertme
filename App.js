import { useEffect, useState } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { en, fr } from "./lang";

import { GluestackUIProvider } from "@gluestack-ui/themed";
import axios from "axios";
import { IntlProvider } from "react-intl";
import { LogBox } from "react-native";
import { configLight } from "./config/gluestack-ui.config";
import RootNavigator from "./navigation/RootNavigator";
import { useStore } from "./store";

LogBox.ignoreAllLogs(); // suppress all warnings

const messages = {
  en,
  fr,
};

export default function App() {
  const [locale, setLocale] = useState("en");
  const [userInfo, setUserInfo] = useState();
  const { getUser } = useStore();
  const { token } = getUser();

  useEffect(() => {
    // axios language headers
    // need to change this later
    axios.defaults.headers.common["Accept-Language"] = "en-CA";
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }, []);

  return (
    <IntlProvider
      messages={messages[locale]}
      locale={locale}
      defaultLocale="en"
    >
      <SafeAreaView style={{ flex: 1 }}>
        <GluestackUIProvider config={configLight}>
          <StatusBar barStyle="light-content" backgroundColor="#FF6B00" />
          <RootNavigator />
        </GluestackUIProvider>
      </SafeAreaView>
    </IntlProvider>
  );
}
