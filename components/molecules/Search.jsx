import { View } from "@gluestack-ui/themed";
import React from "react";
import { StyleSheet } from "react-native";
import SearchIcon from "../../assets/icons/SearchIcon.svg";
import Input from "../atoms/Input";

const Search = (props) => {
  return (
    <View style={styles.container}>
      <Input
        onChange={props.onChange}
        value={props.value}
        style={styles.input}
        icon={SearchIcon}
        placeholder="Search"
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
