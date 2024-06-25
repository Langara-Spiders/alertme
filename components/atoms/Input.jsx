import {
  Icon,
  Input as InputGS,
  InputField,
  InputSlot,
  Text,
  View,
} from "@gluestack-ui/themed";

import { FormattedMessage } from "react-intl";
import { StyleSheet } from "react-native";

const Input = (props) => {
  return (
    <View style={inputDefaultStyle.wrapper}>
      {props.label && (
        <Text style={inputDefaultStyle.label}>
          <FormattedMessage
            id={props.inputMessageId ?? "inputField.input"} // Use a dynamic id if provided
            defaultMessage={props.inputDefaultMessage ?? props.label} // Fallback to label if defaultMessage is not provided
          />
        </Text>
      )}
      <InputGS
        size={props.size ?? "md"}
        variant={props.variant ?? "solid"}
        action={props.action ?? "primary"}
        isDisabled={props.isDisabled ?? false}
        style={[inputDefaultStyle.container, props.style]}
        onChange={props.onChange}
        value={props.value}
      >
        {props.icon && (
          <InputSlot style={props.iconSlotStyle}>
            <Icon
              as={props.icon}
              style={[inputDefaultStyle.icon, props.iconStyle]}
            />
          </InputSlot>
        )}
        <FormattedMessage
          id={props.placeholderMessageId ?? "inputField.placeholder"} // Use a dynamic id if provided
          defaultMessage={props.placeholderDefaultMessage ?? "Search"} // Fallback to "Search" if defaultMessage is not provided
        >
          {(placeholder) => (
            <InputField
              placeholder={placeholder}
              style={[inputDefaultStyle.field, props.fieldStyle]}
            />
          )}
        </FormattedMessage>
        {props.children}
      </InputGS>
    </View>
  );
};

export default Input;

const inputDefaultStyle = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    color: "#fff",
    fontSize: 16,
  },
  container: {
    borderRadius: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
  },
  icon: {
    marginLeft: 10,
    width: 20,
    height: 20,
  },
  field: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    color: "#fff",
  },
});
