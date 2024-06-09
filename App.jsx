import { StyledProvider } from "@gluestack-ui/themed";
import * as React from "react";
import { SafeAreaView } from "react-native";
import { MainNavigator } from "./navigation";
import { configLight, configDark } from "./config/gluestack-ui.config";


export default function App() {

  return (
    <SafeAreaView style={{ flex:1 }}>
      <StyledProvider config={configDark}>
        <MainNavigator />
      </StyledProvider>
    </SafeAreaView>
  );
}
