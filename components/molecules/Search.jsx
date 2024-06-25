import { StyleSheet } from "react-native";
import SearchIcon from "../../assets/icons/SearchIcon";
import { Input } from "../atoms";

const Search = (props) => {
  return (
    <Input
      onChange={props.onChange}
      value={props.value}
      style={searchStyle.input}
      icon={SearchIcon}
      labelId="inputField.search"
      placeholderId="inputField.searchPlaceholder"
      placeholder="Search"
    />
  );
};

export default Search;

const searchStyle = StyleSheet.create({
  input: {
    marginBottom: 20,
  },
});
