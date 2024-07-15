import { Text, View } from "@gluestack-ui/themed";
import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";

import { FormattedMessage } from "react-intl";
import SvgUri from "react-native-svg-uri";
import ConfirmedHazard from "../../assets/icons/map_markers/conf_hazard_icon.svg";
import ArrowLeft from "../../assets/icons/System_Icons/ArrowLeft.svg";
import { LoginAsCard } from "../../components/molecules";

const SelectUserType = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <SvgUri source={ConfirmedHazard} height={40} width={40} />
      </View>
      <View>
        <Text style={styles.text1}>
          <FormattedMessage
            id="Signup.SelectUserType.heading"
            defaultMessage="Help us to know you better!"
          />
        </Text>
        <Text style={styles.text2}>
          <FormattedMessage
            id="Signup.SelectUserType.subheading"
            defaultMessage="Please select the user type to 
begin with"
          />
        </Text>
      </View>
      <View>
        <LoginAsCard userType="civilian" />
        <LoginAsCard />
      </View>

      <View>
        <TouchableOpacity style={styles.touch}>
          <SvgUri
            source={ArrowLeft}
            height={30}
            width={30}
            style={styles.touchIcon}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SelectUserType;

const styles = StyleSheet.create({
  container: {
    gap: 20,
    padding: 20,
  },
  text1: {
    fontSize: 30,
    fontWeight: "bold",
    multiline: true,
  },
  text2: {
    fontSize: 18,
    multiline: true,
  },
  touch: {
    backgroundColor: "#F3F4F4",
    borderRadius: 10,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginTop: 20,
    bottom: 0,
  },
});
