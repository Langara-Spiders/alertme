import { Card, Image, View } from "@gluestack-ui/themed";

import { FormattedMessage } from "react-intl";
import { StyleSheet } from "react-native";
import RewardLevelIcon from "../../../assets/icons/RewardLevelIcon.jsx";
import Typography from "../../atoms/Typography";

const RewardLevelCard = (props) => {
  return (
    <Card style={styles.card}>
      <View style={styles.textContainer}>
        <Typography style={styles.levelText}>
          <FormattedMessage>Level {props.level}</FormattedMessage>
        </Typography>
        <Typography style={styles.subtitleText}>
          <FormattedMessage>{props.subtitle}</FormattedMessage>
        </Typography>
        <Typography style={styles.completedText}>
          <FormattedMessage>Completed {props.completed}</FormattedMessage>
        </Typography>
        <Typography style={styles.progressText}>
          <FormattedMessage>Progress {props.progress}</FormattedMessage>
        </Typography>
      </View>
      <Image source={RewardLevelIcon} style={styles.image} />
    </Card>
  );
};

export default RewardLevelCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1E1E1E",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
  },
  levelText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 5,
  },
  subtitleText: {
    fontSize: 16,
    color: "#FFF",
    marginBottom: 5,
  },
  view2: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  viewInside: {
    alignItems: "center",
  },
  completedText: {
    fontSize: 14,
    color: "#FFF",
    marginBottom: 5,
  },
  progressText: {
    fontSize: 14,
    color: "#FFF",
  },
  image: {
    marginLeft: 10,
  },
});
