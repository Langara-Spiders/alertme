import * as Location from "expo-location";

import { Text, View } from "@gluestack-ui/themed";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { getAutocomplete, getReverseGeoCoding } from "../../api";
import { Debouce, TruncateAddress } from "../../utils";

import { useIntl } from "react-intl";
import SvgUri from "react-native-svg-uri";
import LocationIcon from "../../assets/icons/LocationIcon.svg";
import Input from "../atoms/Input";

const LocationInput = (props) => {
  const intl = useIntl();
  const [suggestions, setSuggestions] = useState([]);
  const [text, setText] = useState();
  const [inputWidth, setInputWidth] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (props.value) setText(props.value);
  }, [props.value]);

  const label = intl.formatMessage({
    id: "input.addresscomponent.labelmessage",
    defaultMessage: "Address*",
  });

  const placeholder = intl.formatMessage({
    id: "input.addresscomponent.placeholdermessage",
    defaultMessage: "Enter address",
  });

  const fetchAddress = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      if (location) {
        const { latitude, longitude } = location.coords;
        const addressData = await getReverseGeoCoding(latitude, longitude);

        const fullAddress =
          addressData.formatted ||
          `${addressData.address_line1}, ${addressData.address_line2}`;
        const truncatedAddress = TruncateAddress(fullAddress, 30);

        setText(truncatedAddress);

        setSuggestions([]);
        if (props.onSelect) {
          props.onSelect({
            truncatedAddress: truncatedAddress,
            fullAddress: fullAddress,
            lat: latitude,
            lon: longitude,
          });
        }
      } else {
        console.error("Could not fetch current location");
      }
    } catch (error) {
      console.error("Error fetching address", error);
    }
  };

  const handleFetchSuggestions = async (text) => {
    if (text.length > 0) {
      try {
        const results = await getAutocomplete(text);
        setSuggestions(results.slice(0, 2));
      } catch (error) {
        console.error("Error fetching autocomplete results:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const debouncedFetchSuggestions = Debouce(handleFetchSuggestions, 300);

  const handleChange = (text) => {
    setText(text);
    debouncedFetchSuggestions(text);
  };

  const handleSelect = (item) => {
    const fullAddress = item.formatted;
    const truncatedAddress = TruncateAddress(item.formatted, 30);

    setText(truncatedAddress);
    setSuggestions([]);

    if (props.onSelect) {
      props.onSelect({
        truncatedAddress: truncatedAddress,
        fullAddress: fullAddress,
        lat: item.lat,
        lon: item.lon,
      });
    }
  };

  const renderItem = ({ item }) => (
    <View style={{ width: "100%", paddingVertical: 10, paddingHorizontal: 20 }}>
      <TouchableOpacity onPress={() => handleSelect(item)}>
        <Text style={styles.suggestion}>{item.formatted}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View
        style={styles.inputContainer}
        onLayout={(event) => {
          const { width } = event.nativeEvent.layout;
          setInputWidth(width);
        }}
        ref={inputRef}
      >
        <Input
          label={props.label ?? label}
          placeholder={placeholder}
          value={text}
          isReadOnly={props?.isReadOnly ?? false}
          onChangeText={handleChange}
          style={styles.input}
          required={true}
          inputbox={styles.customContainer}
        />
        <TouchableOpacity onPress={fetchAddress} style={styles.iconStyle}>
          <SvgUri width="28" height="28" source={LocationIcon} />
        </TouchableOpacity>
      </View>
      {suggestions.length > 0 && (
        <View style={styles.suggestionsListWrapper}>
          <FlatList
            data={suggestions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            style={[styles.suggestionsList, { width: inputWidth - 20 }]}
          />
        </View>
      )}
    </View>
  );
};

export default LocationInput;

const styles = StyleSheet.create({
  container: {
    zIndex: 999,
  },
  inputContainer: {
    position: "relative",
  },
  input: {
    height: 80,
  },
  iconStyle: {
    position: "absolute",
    right: 30,
    top: 65,
    transform: [
      {
        translateY: -10,
      },
    ],
    zIndex: 1,
  },
  suggestionsListWrapper: {
    padding: 10,
    position: "absolute",
    top: 100,
    left: 0,
    right: 0,
    borderColor: "#000",
    borderRadius: 10,
  },
  suggestionsList: {
    position: "absolute",
    borderRadius: 10,
    backgroundColor: "#F3F4F4",
  },
  suggestion: {
    paddingVertical: 10,
    color: "black",
    zIndex: 999,
  },
});
