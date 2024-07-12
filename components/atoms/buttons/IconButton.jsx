import {
  Button as ButtonGS,
  ButtonIcon as ButtonIconGS,
  ButtonText,
  Image,
  View,
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
      style={styles.button}
      icon={props.icon}
      onPress={props.onPress}
    >
      {props.icon && (
        <ButtonIconGS
          as={() => <Image source={props.icon} style={styles.icon} />}
        />
      )}

      <View style={styles.buttonTextContainer}>
        <ButtonText style={styles.text}>{props.children}</ButtonText>
      </View>
    </ButtonGS>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 56,
    backgroundColor: "#131314",
  },
  icon: {
    width: 28,
    height: 28,
  },
  buttonTextContainer: {
    display: "flex",
    margin: "auto",
  },
  text: {
    color: "white",
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "semibold",
  },
});
