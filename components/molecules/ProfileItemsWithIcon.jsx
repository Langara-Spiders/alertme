import { Button, Pressable, Text, View } from "@gluestack-ui/themed";

import { useNavigation } from "@react-navigation/native";
import { FormattedMessage } from "react-intl";
import { StyleSheet } from "react-native";
import SvgUri from "react-native-svg-uri";
import ArrowRightIcon from "../../assets/icons/System_Icons/ArrowRight.svg";

const ProfileItemsWithIcon = (props) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate(props.screen);
  };
  return (
    <Button style={styles.container} onPress={handlePress}>
      <View style={styles.textIcon}>
        <SvgUri width="30" height="30" source={props.icon} />
        <Text style={styles.text}>
          <FormattedMessage
            id={props.messageId}
            defaultMessage={props.defaultMessage}
          />
        </Text>
      </View>
      <Pressable>
        <SvgUri source={ArrowRightIcon} width="24" height="24" />
      </Pressable>
    </Button>
  );
};

export default ProfileItemsWithIcon;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
    backgroundColor: "transparent",
  },
  textIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginLeft: 10,
  },
});
