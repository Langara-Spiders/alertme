import {
  Radio as RadioGS,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
} from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";

const RadioButton = (props) => {
  return (
    <RadioGroup value={props.selectedValue} onChange={props.handleRadioChange}>
      <RadioGS
        value={props.value ?? "change"}
        size={props.size ?? "md"}
        isInvalid={props.isInvalid ?? false}
        isDisabled={props.isDisabled ?? false}
        style={props.style ?? radioButtonDefaultStyle.button}
      >
        <RadioIndicator mr="$2">
          <RadioIcon as={props.icon} strokeWidth={props.strokeWidth} />
        </RadioIndicator>
        <RadioLabel>{props.title ?? "Label"}</RadioLabel>
      </RadioGS>
    </RadioGroup>
  );
};

export default RadioButton;

const radioButtonDefaultStyle = StyleSheet.create({
  button: {
    borderRadius: 50,
    backgroundColor: "theme.colors.pink100",
  },
});
