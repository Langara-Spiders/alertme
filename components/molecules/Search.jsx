import { Input, InputField, InputSlot, SearchIcon } from "@gluestack-ui/themed";

const Search = (props) => {
  return (
    <Input onChange={props.onChange} value={props.value}>
      <InputSlot>
        <InputIcon as={SearchIcon} />
      </InputSlot>
      <InputField placeholder="Search" />
    </Input>
  );
};

export default Search;
