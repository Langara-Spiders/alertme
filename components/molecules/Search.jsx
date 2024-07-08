import { Text, View } from "@gluestack-ui/themed";
import React, { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";

import { useIntl } from "react-intl";
import { getAutocomplete } from "../../api";
import SearchIcon from "../../assets/icons/SearchIcon.svg";
import { Debouce } from "../../utils";
import Input from "../atoms/Input";

const Search = ({ value, onChange, onSelect }) => {
  const intl = useIntl();
  const [text, setText] = useState(value);
  const [suggestions, setSuggestions] = useState([]);

  const placeholder = intl.formatMessage({
    id: "input.searchcomponent.placeholdermessage",
    defaultMessage: "Search",
  });

  const handleFetchSuggestions = async (text) => {
    if (text.length > 0) {
      try {
        const results = await getAutocomplete(text);
        console.log("Autocomplete results:", results);
        setSuggestions(results.slice(0, 3));
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
    onChange(text);
    debouncedFetchSuggestions(text);
  };

  const handleSelect = (item) => {
    onSelect(item);
    setText(item.formatted);
    setSuggestions([]);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSelect(item)}>
      <Text style={styles.suggestion}>{item.formatted}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Input
        value={text}
        onChange={handleChange}
        style={styles.input}
        icon={SearchIcon}
        placeholder={placeholder}
        inputbox={styles.customContainer}
      />
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          style={[styles.suggestionsList, styles.customsuggestionsList]}
        />
      )}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    position: "relative",
    width: "100%",
  },
  customContainer: {
    borderColor: "#333",
    borderWidth: 0.5,
    backgroundColor: "#fff",
    height: 60,
  },
  input: {
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  suggestionsList: {
    position: "absolute",
    top: 70,
    left: 0,
    right: 0,
    borderColor: "#F3F4F4",
    backgroundColor: "#fff",
    borderRadius: 10,
    // maxWidth: 1000,
    zIndex: 1,
    margin: 10,
  },
  suggestion: {
    padding: 20,
    color: "black",
  },
});
