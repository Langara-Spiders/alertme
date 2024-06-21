import { Button, ButtonText, Text, View } from "@gluestack-ui/themed";

import React from "react";
import { StyleSheet } from "react-native";

const Rewards = (props) => {
  const { navigation } = props;
  return (
    <View>
      <Text>Rewards</Text>
      <Button onPress={() => navigation.navigate("LeaderBoard")}>
        <ButtonText>View All</ButtonText>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Rewards;
