import { InputField, Input as InputGS } from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";

const Input = (props) => {
  return (
    <InputGS
      size={props.size ?? "md"}
      variant={props.variant ?? "solid"}
      action={props.action ?? "primary"}
      isDisabled={props.isDisabled ?? false}
      style={props.style ?? InputDefaultStyle}
    >
      <InputField
        placeholder={props.placeholder ?? "Enter"}
        style={props.style ?? inputDefaultStyle.field}
      />
      {props.children}
    </InputGS>
  );
};

export default Input;

const inputDefaultStyle = StyleSheet.create({
  button: {
    borderRadius: 50,
    border: "2px solid $green900",
  },
  field: {
    color: "blue",
  },
});
