import {
    CheckIcon,
    Checkbox as CheckboxGS,
    CheckboxIcon,
    CheckboxIndicator,
    CheckboxLabel,
} from '@gluestack-ui/themed';
import React, { useState } from 'react';

const Checkbox = (props) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        if (props.onChange) {
          props.onChange(!isChecked);
        }
      };
    
    return (
        <CheckboxGS
        size={props.size ?? "md"}
        variant={props.variant ?? "solid"}
        action={props.action ?? "primary"}
        isDisabled={props.isDisabled ?? false}
        isChecked={isChecked}
        onChange={handleCheckboxChange}
        style={props.style ?? checkboxDefaultStyle}
        >

        <CheckboxIndicator mr="$2">
            <CheckboxIcon as={CheckIcon} />
        </CheckboxIndicator>
        <CheckboxLabel>{props.title ?? "Label"}</CheckboxLabel>

        </CheckboxGS>
    )
}

export default Checkbox;

const checkboxDefaultStyle = {
    borderRadius: 50,
}
