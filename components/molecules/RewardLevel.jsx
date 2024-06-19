import { Progress, ProgressFilledTrack, View } from "@gluestack-ui/themed";

import { FormattedMessage } from "react-intl";
import { StyleSheet } from "react-native";
import RewardLevelIcon from "../../assets/icons/RewardLevelIcon";
import Image from "../atoms/Image";
import Typography from "../atoms/Typography";

const RewardLevel = (props) => {
  return (
    <View>
      <Image source={RewardLevelIcon} />
      <Progress value={props.value ?? "1"} style={styles.slider}>
        <ProgressFilledTrack />
      </Progress>
      <Typography size="lg" color="gray">
        <FormattedMessage>{props.reports} Reports</FormattedMessage>{" "}
      </Typography>
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
