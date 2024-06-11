import {Radio as RadioGS,
    RadioIndicator,
    RadioIcon,
    RadioLabel,
    RadioGroup
} from '@gluestack-ui/themed';

const RadioButton = (props) => {

    return (
        <RadioGroup value={props.selectedValue} onChange={props.handleRadioChange}>
        <RadioGS  
          value={props.value ?? "change"} 
          size= {props.size ?? 'md'} 
          isInvalid={props.isInvalid ?? false}  
          isDisabled={props.isDisabled ?? false}
          style={props.style ?? buttonDefaultStyle}>
            <RadioIndicator mr="$2">
                <RadioIcon as={props.icon} strokeWidth={props.strokeWidth} />
            </RadioIndicator>
            <RadioLabel>{props.title ?? "Label"}</RadioLabel>
        </RadioGS>
        </RadioGroup>
    );
}

export default RadioButton;

const buttonDefaultStyle = {
    borderRadius: 50,
    bg: 'theme.colors.pink100'
};