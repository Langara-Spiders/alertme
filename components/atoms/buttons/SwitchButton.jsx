import { Switch as SwitchGS } from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";

const SwitchButton = (props) => {
  return (
    <SwitchGS
      size={props.size ?? "md"}
      color={props.color ?? "primary"}
      variant={props.variant ?? "solid"}
      action={props.action ?? "primary"}
      isDisabled={props.isDisabled ?? false}
      style={props.style ?? switchButtonDefaultStyle.button}
    />
  );
};

export default SwitchButton;

const switchButtonDefaultStyle = StyleSheet.create({
  button: {
    borderRadius: 50,
    width: 100,
    height: 100,
  },
});
