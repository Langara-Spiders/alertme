import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { View } from "@gluestack-ui/themed";
import { useIntl } from "react-intl";
import SvgUri from "react-native-svg-uri";
import LocationIcon from "../../assets/icons/LocationIcon.svg";
import Input from "../atoms/Input";

const LocationInput = (props) => {
  const intl = useIntl();

  const label = intl.formatMessage({
    id: "input.addresscomponent.labelmessage",
    defaultMessage: "Address *",
  });

  const placeholder = intl.formatMessage({
    id: "input.addresscomponent.placeholdermessage",
    defaultMessage: "Enter address",
  });

  return (
    <View style={styles.container}>
      <Input
        label={props.label ?? label}
        placeholder={placeholder}
        value={props?.value?.address_line1}
        isReadOnly={props?.isReadOnly ?? true}
      />
      <TouchableOpacity onPress={props.onChange} style={styles.iconStyle}>
        <SvgUri width="20" height="20" source={LocationIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default LocationInput;

const styles = StyleSheet.create({
  iconStyle: {
    position: "absolute",
    right: 20,
    top: "50%",
    transform: [
      {
        translateY: -2,
      },
    ],
    zIndex: 1,
  },
});
