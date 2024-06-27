import { View } from "@gluestack-ui/themed";
import React from "react";
import { useIntl } from "react-intl";
import { StyleSheet } from "react-native";
import SearchIcon from "../../assets/icons/SearchIcon.svg";
import Input from "../atoms/Input";

const Search = (props) => {
  const intl = useIntl();
  const placeholder = intl.formatMessage({
    id: "input.searchcomponent.placeholdermessage",
    defaultMessage: "Search",
  });

  return (
    <View style={styles.container}>
      <Input
        onChange={props.onChange}
        value={props.value}
        style={styles.input}
        icon={SearchIcon}
        placeholder={placeholder}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
  },
});
