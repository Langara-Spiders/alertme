import React, { useState } from "react";

import { View } from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";
import LocationIcon from "../../assets/icons/LocationIcon.svg";
import Input from "../atoms/Input";

const LocationInput = () => {
  const [address, setAddress] = useState("");

  const onAddressChange = (text) => {
    setAddress(text);
  };

  return (
    <View style={styles.container}>
      <Input
        label="Address *"
        placeholder="Enter address"
        onChange={onAddressChange}
        value={address}
        icon={LocationIcon}
        iconSlotStyle={styles.iconSlot}
      />
    </View>
  );
};

export default LocationInput;

const styles = StyleSheet.create({
  iconSlot: {
    position: "absolute",
    right: 20,
    top: "50%",
    transform: [{ translateY: -10 }],
    zIndex: 1,
  },
});
