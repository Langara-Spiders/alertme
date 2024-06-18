import CheckboxButton from "../atoms";
import { StyleSheet } from "react-native"
import Typography from "../atoms/Typography";
import {View} from "@gluestack-ui/themed";

const CheckboxWithText = (props) => {
  return(
    <View>
      <CheckboxButton style={styles.checkbox} title={props.title}/>
      {/* <Typography style={styles.text}>{props.text}</Typography> */}
    </View>
  )
}

export default CheckboxWithText;

const styles = StyleSheet.create({
  checkbox: {
    marginLeft: 10
  }
})
