import * as Location from "expo-location";

import { Text, View } from "@gluestack-ui/themed";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { getAutocomplete, getReverseGeoCoding } from "../../api";

import { useIntl } from "react-intl";
import SvgUri from "react-native-svg-uri";
import LocationIcon from "../../assets/icons/LocationIcon.svg";
import { Debouce } from "../../utils";
import Input from "../atoms/Input";

// Adjust the import if needed
// Adjust the import if needed

const LocationInput = (props) => {
  const intl = useIntl();
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [text, setText] = useState("");
  const [inputWidth, setInputWidth] = useState(0);
  const inputRef = useRef(null);

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
      setText(props.value.address_line1);
    } else {
      fetchAddress();
    }
  }, [props.value]);

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
          addressData.street ||
          `${addressData.city}, ${addressData.state}, ${addressData.country}`;
        setAddress(fullAddress);
        setText(fullAddress);
        setSuggestions([]);
        if (props.onSelect) {
          props.onSelect({
            formatted: fullAddress,
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
        console.log("Autocomplete results:", results);
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
    console.log("Input changed to:", text);
    setText(text);
    debouncedFetchSuggestions(text);
  };

  const handleSelect = (item) => {
    setAddress(item.formatted);
    setText(item.formatted);
    setSuggestions([]);
    if (props.onSelect) {
      props.onSelect(item);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSelect(item)}>
      <Text style={styles.suggestion}>{item.formatted}</Text>
    </TouchableOpacity>
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
          onChange={handleChange}
          style={styles.input}
          required={true}
          inputbox={styles.customContainer}
        />
        <TouchableOpacity onPress={fetchAddress} style={styles.iconStyle}>
          <SvgUri width="28" height="28" source={LocationIcon} />
        </TouchableOpacity>
      </View>
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          style={[styles.suggestionsList, { width: inputWidth }]}
        />
      )}
    </View>
  );
};

export default LocationInput;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
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

  suggestionsList: {
    position: "absolute",
    top: 100,
    left: 0,
    right: 0,
    borderColor: "#000",
    backgroundColor: "#F3F4F4",
    borderRadius: 10,
    maxWidth: 400,
    zIndex: 1,
    margin: 10,
  },
  suggestion: {
    padding: 20,
    color: "black",
  },
});
