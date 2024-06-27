import React, { useState } from "react";

import { View } from "@gluestack-ui/themed";
import { useIntl } from "react-intl";
import { StyleSheet } from "react-native";
import LocationIcon from "../../assets/icons/LocationIcon.svg";
import Input from "../atoms/Input";

const LocationInput = () => {
  const intl = useIntl();

  const label = intl.formatMessage({
    id: "input.addresscomponent.labelmessage",
    defaultMessage: "Address *",
  });

  const placeholder = intl.formatMessage({
    id: "input.addresscomponent.placeholdermessage",
    defaultMessage: "Enter address",
  });

  const [address, setAddress] = useState("");

  const onAddressChange = (text) => {
    setAddress(text);
  };

  return (
    <View style={styles.container}>
      <Input
        label={label}
        placeholder={placeholder}
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
