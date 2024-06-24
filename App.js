import { SafeAreaView, StatusBar } from "react-native";
import { en, fr } from "./lang";

import { GluestackUIProvider } from "@gluestack-ui/themed";
import axios from "axios";
import { useState } from "react";
import { IntlProvider } from "react-intl";
import { configLight } from "./config/gluestack-ui.config";
import RootNavigator from "./navigation/RootNavigator";

const messages = {
  en,
  fr,
};

export default function App() {
  const [locale, setLocale] = useState("en");
  const [userInfo, setUserInfo] = useState();

  // axios language headers
  // need to change this later
  axios.defaults.headers.common = {
    "Accept-Language": "en-CA",
  };

  return (
    <IntlProvider
      messages={messages[locale]}
      locale={locale}
      defaultLocale="en"
    >
      <SafeAreaView style={{ flex: 1 }}>
        <GluestackUIProvider config={configLight}>
          <StatusBar barStyle="light-content" backgroundColor="black" />
          <RootNavigator />
        </GluestackUIProvider>
      </SafeAreaView>
    </IntlProvider>
  );
}
