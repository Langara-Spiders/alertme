// import { StyledProvider } from "@gluestack-ui/themed";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading'
import * as React from "react";
import { useState } from 'react';
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

/* const fetchFonts = () => {
  return Font.loadAsync({
    'Roboto-Regular': require('@expo-google-fonts/roboto/Roboto_400Regular.ttf'),
    'Roboto-Bold': require('@expo-google-fonts/roboto/Roboto_700Bold.ttf'),
    'Nunito-Regular': require('@expo-google-fonts/nunito/Nunito_400Regular.ttf'),
    'Nunito-Bold': require('@expo-google-fonts/nunito/Nunito_700Bold.ttf'),
  });
}; */

export default function App() {

  //const [fontLoaded, setFontLoaded] = useState(false);
  const [locale, setLocale] = React.useState("en");

  /* if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={console.warn}
      />
    );
  } */

  return (
    <IntlProvider messages={messages[locale]} locale={locale} defaultLocale="en">
      <SafeAreaView style={{ flex:1 }}>
        <GluestackUIProvider config={configLight}>
          <MainNavigator />
        </GluestackUIProvider>
      </SafeAreaView>
    </IntlProvider>
  );
}
