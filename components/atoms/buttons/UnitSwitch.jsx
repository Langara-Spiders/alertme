import { Button, Text, View } from "@gluestack-ui/themed";

import React from "react";
import { FormattedMessage } from "react-intl";
import { StyleSheet } from "react-native";

const UnitSwitch = ({ isKm, onValueChange }) => {
  return (
    <View style={styles.switchContainer}>
      <Button
        style={[
          styles.button,
          !isKm && styles.activeButton,
          isKm && styles.inactiveButton,
        ]}
        onPress={() => onValueChange(false)}
      >
        <Text
          style={[
            styles.label,
            !isKm ? styles.activeLabel : styles.inactiveLabel,
          ]}
        >
          <FormattedMessage id="atoms.unitswitch.mile" defaultMessage="Mile" />
        </Text>
      </Button>
      <Button
        style={[
          styles.button,
          isKm && styles.activeButton,
          !isKm && styles.inactiveButton,
        ]}
        onPress={() => onValueChange(true)}
      >
        <Text
          style={[
            styles.label,
            isKm ? styles.activeLabel : styles.inactiveLabel,
          ]}
        >
          <FormattedMessage id="atoms.unitswitch.km" defaultMessage="Km" />
        </Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 160,
    height: 40,
    backgroundColor: "#e0e0e0",
    borderRadius: 25,
    padding: 5,
    position: "relative",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    borderRadius: 25,
  },
  activeButton: {
    backgroundColor: "#ff6f00",
  },
  inactiveButton: {
    backgroundColor: "transparent",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  activeLabel: {
    color: "#fff",
  },
  inactiveLabel: {
    color: "#888",
  },
});

export default UnitSwitch;
