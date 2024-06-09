import { StyledProvider } from "@gluestack-ui/themed";
import * as React from "react";
import { SafeAreaView } from "react-native";
import { MainNavigator } from "./navigation";
import { configLight, configDark } from "./config/gluestack-ui.config";
import { IntlProvider } from "react-intl";
import {
  en,
  fr
} from "./lang";

const messages = {
  en,
  fr
}

export default function App() {
  const [locale, setLocale] = React.useState("en");

  return (
    <IntlProvider messages={messages[locale]} locale={locale} defaultLocale="en">
      <SafeAreaView style={{ flex:1 }}>
        <StyledProvider config={configDark}>
          <MainNavigator />
        </StyledProvider>
      </SafeAreaView>
    </IntlProvider>
  );
}
