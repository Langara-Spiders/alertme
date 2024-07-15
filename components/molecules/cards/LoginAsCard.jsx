import { Card, HStack, Text, View, VStack } from "@gluestack-ui/themed";
import { StyleSheet, TouchableOpacity } from "react-native";

import { FormattedMessage } from "react-intl";
import Image from "../../atoms/Image";

const Civilian = require("../../../assets/images/civilian-female.png");
const ConstructionWorker = require("../../../assets/images/construction-male.png");

const LoginAsCard = (props) => {
  const handlePress = () => {
    console.log(`${props.userType} card pressed`);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.touchable}>
      <Card style={styles.card}>
        {props.userType === "civilian" ? (
          <>
            <HStack style={styles.hStack} space="md">
              <Image
                source={Civilian}
                alt="Civilian Icon"
                style={styles.icon}
              />
              <View style={styles.view}>
                <VStack>
                  <Text size="$4xl" style={styles.title}>
                    <FormattedMessage
                      id="molecules.cards.LoginAsCard.civilian.heading"
                      defaultMessage="I'm Civilian"
                    />
                  </Text>
                  <Text size="$md" style={styles.description}>
                    <FormattedMessage
                      id="molecules.cards.LoginAsCard.civilian.subheading"
                      defaultMessage="Community civilians can select this option to proceed
                    further"
                    />
                  </Text>
                </VStack>
              </View>
            </HStack>
          </>
        ) : (
          <>
            <HStack style={styles.hStack} space="md">
              <Image
                source={ConstructionWorker}
                alt="Organization Icon"
                style={styles.icon}
              />
              <View style={styles.view}>
                <VStack>
                  <Text size="$lg" style={styles.title}>
                    <FormattedMessage
                      id="molecules.cards.LoginAsCard.constructionworker.heading"
                      defaultMessage="Construction Worker"
                    />
                  </Text>
                  <Text size="body1" style={styles.description}>
                    <FormattedMessage
                      id="molecules.cards.LoginAsCard.constructionworker.subheading"
                      defaultMessage="Construction employee can select this option to proceed
                    further"
                    />
                  </Text>
                </VStack>
              </View>
            </HStack>
          </>
        )}
      </Card>
    </TouchableOpacity>
  );
};

export default LoginAsCard;

const styles = StyleSheet.create({
  touchable: {
    marginBottom: 8,
  },
  card: {
    padding: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F3F4F4",
    marginBottom: 10,
    height: 168,
  },
  icon: {
    width: 80,
    height: 80,
    // marginBottom: 10,
  },
  view: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    textAlign: "left",
  },
});
