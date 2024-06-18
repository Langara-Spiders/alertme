import Checkbox from "../atoms/Checkbox";
import { StyleSheet } from "react-native"
import Typography from "../atoms/Typography";
import {View} from "@gluestack-ui/themed";

const CheckboxWithText = (props) => {
  return(
    <View>
      <Checkbox style={styles.checkbox} title={props.title}/>
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
