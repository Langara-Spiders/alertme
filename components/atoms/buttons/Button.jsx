import { Button as ButtonGS, ButtonText } from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";

const Button = (props) => {
  return (
    <ButtonGS
      size={props.size ?? "md"}
      variant={props.variant ?? "solid"}
      action={props.action ?? "primary"}
      isDisabled={props.isDisabled ?? false}
      onPress={props.onPress}
      style={props.style ?? buttonDefaultStyle.button}
    >
      <ButtonText>{props.children}</ButtonText>
    </ButtonGS>
  );
};

export default Button;

const buttonDefaultStyle = StyleSheet.create({
  button: {
    borderRadius: 50,
  },
});
