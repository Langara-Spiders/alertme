import React from "react";
import { StyleSheet } from "react-native";
import LocationIcon from "../../assets/icons/LocationIcon";
import Input from "../atoms/Input"; // Update the path as necessary

const LocationInput = (props) => {
  return (
    <Input
      label="Address*"
      placeholder="Type address"
      icon={LocationIcon}
      fieldStyle={styles.inputField}
      iconSlotStyle={styles.iconSlot}
      iconStyle={styles.icon}
    />
  );
};

export default LocationInput;

const styles = StyleSheet.create({
  label: {
    marginBottom: 5,
    color: "#fff",
  },
  inputField: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    color: "#fff",
  },
});
