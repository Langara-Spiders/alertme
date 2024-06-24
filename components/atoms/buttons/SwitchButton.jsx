import { Switch as SwitchGS } from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";

const SwitchButton = (props) => {
  return (
    <SwitchGS
      size={props.size ?? "md"}
      color={props.color ?? "#FF9900"}
      variant={props.variant ?? "solid"}
      action={props.action ?? "primary"}
      isDisabled={props.isDisabled ?? false}
      onValueChange={props.onValueChange}
      value={props.value}
      trackColor={props.trackColor}
      style={props.style ?? style.button}
    />
  );
};

export default SwitchButton;

const style = StyleSheet.create({
  button: {
    borderRadius: 50,
  },
});
