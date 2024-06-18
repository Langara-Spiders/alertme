import {
  Button as ButtonGS,
  ButtonIcon as ButtonIconGS,
  ButtonText,
} from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";

const IconButton = (props) => {
  return (
    <ButtonGS
      color={props.color ?? "black"}
      size={props.size ?? "md"}
      variant={props.variant ?? "solid"}
      action={props.action ?? "primary"}
      isDisabled={props.isDisabled ?? false}
      isFocusVisible={props.isFocusVisible ?? false}
      style={props.style ?? iconButtonDefaultStyle.button}
      icon={props.icon}
    >
      <ButtonIconGS as={props.icon}></ButtonIconGS>
      <ButtonText>{props.children}</ButtonText>
    </ButtonGS>
  );
};

export default IconButton;

const iconButtonDefaultStyle = StyleSheet.create({
  button: {
    borderRadius: 50,
    bg: "theme.colors.pink100",
  },
});
