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
      style={props.style?.button ?? styles.button}
    >
      <ButtonText style={props.style?.buttonText ?? styles.buttonText}>
        {props.children}
      </ButtonText>
    </ButtonGS>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    backgroundColor: "#FF6B00",
    color: "white",
  },
  buttonText: {
    color: "white",
  },
});
