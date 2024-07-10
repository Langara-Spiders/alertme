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
    defaultMessage: "Issues Reported ",
  });

  const textnamesub = intl.formatMessage({
    id: "ComponentAtom.numOfIssuesCard.textMessage",
    defaultMessage: "Around You",
  });

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <SvgUri width="40" height="40" source={HazardIcon} />
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
    justifyContent: "center",
    backgroundColor: "#18191A",
    padding: 10,
    borderRadius: 10,
  },
  iconContainer: {
    backgroundColor: "#6A5300",
    margin: 5,
    borderRadius: 10,
    width: 50,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  textDivide: {
    flexDirection: "column",
    alignItems: "start",
    justifyContent: "center",
  },
  text1: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#C2C7C8",
  },
  text2: {
    marginLeft: 10,
    fontSize: 14,
    color: "#C2C7C8",
  },
});
