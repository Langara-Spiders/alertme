import {
  Checkbox as CheckboxGS,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";

const CheckboxButton = (props) => {
  return (
    <CheckboxGS
      size={props.size ?? "md"}
      variant={props.variant ?? "solid"}
      action={props.action ?? "primary"}
      isDisabled={props.isDisabled ?? false}
      onPress={props.onPress}
      style={props.style ?? checkboxDefaultStyle.checkbox}
    >
      <CheckboxIndicator>
        <CheckboxIcon as={props.icon} />
      </CheckboxIndicator>
      <CheckboxLabel>{props.title ?? "Label"}</CheckboxLabel>
    </CheckboxGS>
  );
};

export default CheckboxButton;

const checkboxDefaultStyle = StyleSheet.create({
  checkbox: {
    borderRadius: 50,
  },
});
