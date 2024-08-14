import { Pressable, Text, View } from "@gluestack-ui/themed";
import { StyleSheet, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native";
import ArrowRightIcon from "../../assets/icons/profile_icons/arrow_right_icon.png";
import { useStore } from "../../store";

const ProfileItemsWithIcon = (props) => {
  const navigation = useNavigation();
  const { palette } = useStore();

  const handlePress = () => {
    navigation.navigate(props.screen);
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginVertical: 10,
      marginHorizontal: 20,
      backgroundColor: "transparent",
    },
    textIcon: {
      flexDirection: "row",
      alignItems: "center",
    },
    text: {
      marginLeft: 10,
      fontWeight: "600",
      color: palette.txt1,
    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.textIcon}>
        <Image
          style={{
            width: 30,
            height: 30,
            tintColor: palette.txt1,
          }}
          source={props.icon}
        />
        <Text style={styles.text}>{props.label}</Text>
      </View>
      <Pressable>
        <Image
          source={ArrowRightIcon}
          style={{ width: 24, height: 24, tintColor: palette.txt1 }}
        />
      </Pressable>
    </TouchableOpacity>
  );
};

export default ProfileItemsWithIcon;
