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
      style={[styles.button, props.style?.button]}
    >
      <ButtonText style={[styles.buttonText, props.style?.buttonText]}>
        {props.children}
      </ButtonText>
    </ButtonGS>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    height: 60,
    backgroundColor: "#FF6B00",
    color: "white",
  },
  buttonText: {
    color: "white",
  },
});
