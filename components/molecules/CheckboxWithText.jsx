import { View } from "@gluestack-ui/themed";
import { StyleSheet } from "react-native";
import CheckboxButton from "../atoms";

const CheckboxWithText = (props) => {
  return (
    <View>
      <CheckboxButton style={styles.checkbox} title={props.title} />
      {/* <Typography style={styles.text}>{props.text}</Typography> */}
    </View>
  );
};

export default CheckboxWithText;

const styles = StyleSheet.create({
  checkbox: {
    marginLeft: 10,
  },
});
