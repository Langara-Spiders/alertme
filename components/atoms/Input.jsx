import {
  Input as InputGS,
  InputField,
  InputSlot,
  Text,
  View,
} from "@gluestack-ui/themed";
import { Image, StyleSheet } from "react-native";

import { useStore } from "../../store";

const Input = (props) => {
  const { palette } = useStore();

  const styles = StyleSheet.create({
    wrapper: {
      padding: 10,
      marginTop: 1,
    },
    label: {
      color: "#333",
      fontSize: 16,
      marginBottom: 8,
    },
    container: {
      borderRadius: 10,
      borderColor: "#F3F4F4",
      height: 56,
      paddingHorizontal: 12,
      backgroundColor: "#F3F4F4",
      alignItems: "center",
      justifyContent: "start",
      width: "100%",
    },
    field: {
      flex: 1,
      paddingVertical: 12,
      color: palette.txt1,
    },
  });

  return (
    <View style={styles.wrapper}>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      <InputGS
        size={props.size ?? "md"}
        variant={props.variant ?? "solid"}
        action={props.action ?? "primary"}
        isDisabled={props.isDisabled ?? false}
        style={[styles.container, props.inputbox, props.style?.inputbox]}
        isReadOnly={props.isReadOnly ?? false}
        required={props.required ?? false}
      >
        {props.icon && (
          <InputSlot style={props.iconSlotStyle}>
            <Image
              source={props.icon}
              style={{ width: 25, height: 25, tintColor: palette.txt1 }}
            />
          </InputSlot>
        )}
        <InputField
          value={props.value}
          onChangeText={props.onChangeText}
          placeholder={props.placeholder}
          style={[styles.field, props.style?.searchfield]}
          multiline={false}
          numberOfLines={1}
          ellipsizeMode="tail"
        />
      </InputGS>
    </View>
  );
};

export default Input;
