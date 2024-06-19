import {
  Icon,
  Input as InputGS,
  InputField,
  InputSlot,
  View,
} from "@gluestack-ui/themed";

import { FormattedMessage } from "react-intl";
import { StyleSheet } from "react-native";
import Typography from "../atoms/Typography";

const Input = (props) => {
  return (
    <View style={inputDefaultStyle.wrapper}>
      {props.label && (
        <Typography>
          <FormattedMessage
            id="inputField.input"
            style={inputDefaultStyle.label}
            defaultMessage={props.label}
          />
        </Typography>
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
          <InputSlot>
            <Icon as={props.icon} style={inputDefaultStyle.icon} />
          </InputSlot>
        )}
        <InputField
          placeholder={props.placeholder ?? "Search"}
          style={inputDefaultStyle.field}
        />
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
