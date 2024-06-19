import {
  Progress,
  ProgressFilledTrack,
  Text,
  View,
} from "@gluestack-ui/themed";

import { FormattedMessage } from "react-intl";
import { StyleSheet } from "react-native";
import RewardLevelIcon from "../../assets/icons/RewardLevelIcon";

const RewardLevel = (props) => {
  return (
    <View>
      <RewardLevelIcon />
      <Progress value={props.value ?? "1"} style={styles.slider}>
        <ProgressFilledTrack />
      </Progress>
      <Text>
        <FormattedMessage
          id="reports.report"
          defaultMessage={props.reports}
          Reports
        />
      </Text>
    </View>
  );
};

export default RewardLevel;

const styles = StyleSheet.create({
  slider: {
    width: 100,
    height: 10,
    borderRadius: 10,
    backgroundColor: "#D9D9D9",
  },
});
