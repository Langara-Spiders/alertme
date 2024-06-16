import {Input, InputField, InputSlot, SearchIcon} from '@gluestack-ui/themed'

import React from 'react';

const Search = (props) => {

  const { placeholder, onChange, value } = props;
  
  return (
    <Input
    onChange={onChange}
    value={value}
    >
      <InputSlot>
        <InputIcon as={SearchIcon} />
      </InputSlot>
      <InputField placeholder="Search" />
    </Input>

  );

}

export default Search;
