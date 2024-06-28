import {
  Input as InputGS,
  InputField,
  InputSlot,
  Text,
  View,
} from "@gluestack-ui/themed";

import { StyleSheet } from "react-native";
import SvgUri from "react-native-svg-uri";

const Input = (props) => {
  return (
    <View style={styles.wrapper}>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      <InputGS
        size={props.size ?? "md"}
        variant={props.variant ?? "solid"}
        action={props.action ?? "primary"}
        isDisabled={props.isDisabled ?? false}
        style={[styles.container, props.style]}
        isReadOnly={props.isReadOnly ?? false}
      >
        {props.icon && (
          <InputSlot style={props.iconSlotStyle}>
            <SvgUri source={props.icon} width="20" height="20" />
          </InputSlot>
        )}
        <InputField
          value={props.value}
          onChangeText={props.onChange}
          placeholder={props.placeholder}
          style={styles.field}
        />
      </InputGS>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
  label: {
    color: "#333",
    fontSize: 16,
  },
  container: {
    borderRadius: 10,
    borderColor: "#F3F4F4",
    height: 56,
    paddingHorizontal: 12,
    backgroundColor: "#F3F4F4",
  },
  icon: {
    marginLeft: 10,
    width: 20,
    height: 20,
    backgroundColor: "#F3F4F4",
  },
  field: {
    flex: 1,
    paddingVertical: 12,
  },
});
