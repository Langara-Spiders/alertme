import { StyleSheet } from "react-native";
import SearchIcon from "../../assets/icons/SearchIcon";
import Input from "../atoms/Input";

const Search = (props) => {
  return (
    <Input
      onChange={props.onChange}
      value={props.value}
      style={searchStyle.input}
      icon={SearchIcon}
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
