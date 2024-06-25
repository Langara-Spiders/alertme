import { CloseIcon, Link, LinkText, Text } from "@gluestack-ui/themed";
import React, { useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { FormattedMessage } from "react-intl";
import SvgUri from "react-native-svg-uri";
import GreatWorkBadge from "../../../assets/images/GreatWorkBadge.svg";

const { height: screenHeight } = Dimensions.get("window");

const GreatWorkCard = (props) => {
  const [isVisible, setIsVisible] = useState(true);
  const navigation = useNavigation();

  const handleClose = () => {
    console.log("Close button pressed");
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
        <CloseIcon color="white" />
      </TouchableOpacity>
      <View style={styles.topSection}>
        <Text style={styles.heading}>
          <FormattedMessage
            id="molecules.cards.greatWorkCard.heading"
            defaultMessage="Great Work!"
          />
        </Text>
      </View>
      <SvgUri
        width="300"
        height="150"
        source={GreatWorkBadge}
        style={styles.badge}
      />
      <View style={styles.bottomSection}>
        <View style={styles.congoText2}>
          <Text style={styles.combine}>
            <FormattedMessage
              id="molecules.cards.greatWorkCard.congratsText"
              defaultMessage="Congratulation🎉"
            />
          </Text>
          <Text style={styles.combine}>
            <FormattedMessage
              id="molecules.cards.greatWorkCard.congratsSubText"
              defaultMessage="Your level 3 completed"
            />
          </Text>
        </View>
        <View style={styles.reportText}>
          <Text style={styles.subText}>
            <FormattedMessage
              id="molecules.cards.greatWorkCard.reportText"
              defaultMessage="You’ve posted 25 successful reports."
            />
          </Text>
        </View>
        <Link
          onPress={() => navigation.navigate("Rewards")}
          style={styles.link}
        >
          <LinkText style={styles.link}>
            <FormattedMessage
              id="molecules.cards.greatWorkCard.gotorewardLink"
              defaultMessage="Go to Rewards"
            />
          </LinkText>
        </Link>
      </View>
    </View>
  );
};

export default GreatWorkCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: 20,
    margin: 20,
    backgroundColor: "rgba(123, 105, 230, 0.3)",
    overflow: "hidden",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 5,
    padding: 10,
  },
  topSection: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "rgba(123, 105, 230, 0.3)",
    height: screenHeight * 0.2,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  badge: {
    position: "absolute",
    top: screenHeight * 0.1,
    alignSelf: "center",
    zIndex: 10,
  },
  bottomSection: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: screenHeight * 0.3,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  congoText2: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    marginTop: 60,
  },
  combine: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  subText: {
    fontSize: 16,
    color: "#333333",
    textAlign: "center",
  },
  reportText: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  link: {
    alignItems: "center",
    color: "#FF5733",
    textDecorationLine: "none",
    marginTop: 10,
    marginBottom: 10,
  },
});
