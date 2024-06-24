import {
  Progress,
  ProgressFilledTrack,
  Text,
  View,
} from "@gluestack-ui/themed";

import { FormattedMessage } from "react-intl";
import { StyleSheet } from "react-native";
import SvgUri from "react-native-svg-uri";
import rewardlevel from "../../assets/images/rewardlevel.svg";

const RewardLevel = (props) => {
  const progressValue = props.reports ? parseInt(props.reports, 10) : 0;

  return (
    <View style={styles.mainView}>
      <SvgUri width="100" height="100" source={rewardlevel} />
      <Progress value={progressValue} style={styles.slider}>
        <ProgressFilledTrack style={styles.sliderfilled} />
      </Progress>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          {props.reports ?? "0"}
          <FormattedMessage
            id="rewardMolecule.reportlevel"
            defaultMessage=" Reports"
          />
        </Text>
      </View>
    </View>
  );
};

export default RewardLevel;

const styles = StyleSheet.create({
  mainView: {
    alignItems: "center",
    gap: 2,
  },
  sliderfilled: {
    backgroundColor: "#FF6B00",
  },
  slider: {
    height: 3,
    borderRadius: 2,
    strokeWidth: 2,
    backgroundColor: "#FFDABF",
    width: "30%",
  },
  textContainer: {
    marginLeft: 10,
  },
  text: {
    textAlign: "center",
  },
});
