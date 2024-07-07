import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { View } from "@gluestack-ui/themed";
import { useIntl } from "react-intl";
import SvgUri from "react-native-svg-uri";
import { getReverseGeoCoding } from "../../api";
import LocationIcon from "../../assets/icons/LocationIcon.svg";
import Input from "../atoms/Input";

const LocationInput = (props) => {
  const intl = useIntl();
  const [address, setAddress] = useState("");

  const label = intl.formatMessage({
    id: "input.addresscomponent.labelmessage",
    defaultMessage: "Address *",
  });

  const placeholder = intl.formatMessage({
    id: "input.addresscomponent.placeholdermessage",
    defaultMessage: "Enter address",
  });

  useEffect(() => {
    if (props.value?.address_line1) {
      setAddress(props.value.address_line1);
    }
  }, [props.value]);

  const fetchAddress = async () => {
    if (props.latitude && props.longitude) {
      try {
        const addressData = await getReverseGeoCoding(
          props.latitude,
          props.longitude
        );
        const fullAddress =
          addressData.street ||
          `${addressData.city}, ${addressData.state}, ${addressData.country}`;
        setAddress(fullAddress);
      } catch (error) {
        console.error("Error fetching address", error);
      }
    } else {
      console.error("Latitude and Longitude are required");
    }
  };

  return (
    <View style={styles.container}>
      <Input
        label={props.label ?? label}
        placeholder={placeholder}
        value={address}
        isReadOnly={props?.isReadOnly ?? true}
        style={styles.input}
        required={true}
      />
      <TouchableOpacity onPress={fetchAddress} style={styles.iconStyle}>
        <SvgUri width="20" height="20" source={LocationIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default LocationInput;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
  },
  input: {
    height: 80,
  },
  iconStyle: {
    position: "absolute",
    right: 30,
    top: "59%",
    transform: [
      {
        translateY: 0,
      },
    ],
    zIndex: 1,
  },
});
