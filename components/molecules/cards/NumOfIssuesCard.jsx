import { Text, View } from "@gluestack-ui/themed";
import { useIntl } from "react-intl";

import { StyleSheet } from "react-native";
import SvgUri from "react-native-svg-uri";
import HazardIcon from "../../../assets/icons/map_markers/hazard_icon.svg";

const NumOfIssuesCard = (props) => {
  const numOfIssues = props.numOfIssues;

  const intl = useIntl();

  const textname = intl.formatMessage({
    id: "ComponentAtom.numOfIssuesCard.textMessage",
    defaultMessage: "Issues Reported",
  });

  const textnamesub = intl.formatMessage({
    id: "ComponentAtom.numOfIssuesCard.textMessage",
    defaultMessage: "Around you",
  });

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <SvgUri width="30" height="30" source={HazardIcon} />
      </View>
      <View style={styles.textDivide}>
        <Text style={styles.text1}>
          {numOfIssues} {textname}
        </Text>
        <Text style={styles.text2}>{textnamesub}</Text>
      </View>
    </View>
  );
};

export default NumOfIssuesCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#18191A",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 15,
    width: "auto",
  },
  iconContainer: {
    backgroundColor: "#6A5300",
    borderRadius: 10,
    padding: 5,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textDivide: {
    flexDirection: "column",
    justifyContent: "center",
  },
  text1: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#C2C7C8",
  },
  text2: {
    fontSize: 14,
    color: "#C2C7C8",
  },
});
