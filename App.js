import { GluestackUIProvider } from "@gluestack-ui/themed";
import * as React from "react";
import { IntlProvider } from "react-intl";
import { SafeAreaView, StatusBar } from "react-native";
import { configLight } from "./config/gluestack-ui.config";
import { en, fr } from "./lang";
import RootNavigator from "./navigation/RootNavigator";
import ChooseUser from "./pages/ChooseUser";


const messages = {
  en,
  fr,
};

export default function App() {
  const [locale, setLocale] = React.useState("en");

  return (
    <IntlProvider
      messages={messages[locale]}
      locale={locale}
      defaultLocale="en"
    >
      <SafeAreaView style={{ flex: 1 }}>
        <GluestackUIProvider config={configLight}>
          <StatusBar barStyle="light-content" backgroundColor="black" />
         {/*  <RootNavigator /> */}
          <ChooseUser />
        </GluestackUIProvider>
      </SafeAreaView>
    </IntlProvider>
  );
}
