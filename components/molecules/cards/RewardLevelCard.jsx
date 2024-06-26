import { Card, View } from "@gluestack-ui/themed";
import { FormattedMessage, useIntl } from "react-intl";
import { Image, StyleSheet } from "react-native";

import Typography from "../../atoms/Typography";

/* This component displays a reward level card with the user's level,
subtitle, earned points, issues reported,
and an icon with a view progress text. */
const RewardLevelCard = (props) => {
  const intl = useIntl();
  return (
    <Card style={styles.card}>
      <View style={styles.leftContainer}>
        <Typography style={styles.levelText}>
          <FormattedMessage
            id="RewardLevelCard.levelText"
            defaultMessage="Level"
          />{" "}
          {props.level}
        </Typography>
        <Typography style={styles.subtitleText}>Incident Reported</Typography>
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Typography style={styles.statLabel}>
              <FormattedMessage
                id="RewardLevelCard.earnedPoints"
                defaultMessage="Earned Points"
              />
            </Typography>
            <Typography style={styles.statValue}>{props.earned}</Typography>
          </View>
          <View style={styles.statAdjusted}>
            <Typography style={styles.statLabel}>
              <FormattedMessage
                id="RewardLevelCard.issuesReported"
                defaultMessage=" Issues Reported"
              />
            </Typography>
            <Typography style={styles.statValue}>{props.reported}</Typography>
          </View>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <Image source={props.icon} style={styles.icon} alt="level card icon" />
        <Typography style={styles.viewProgressText}>View Progress</Typography>
      </View>
    </Card>
  );
};

export default RewardLevelCard;

/* Styles for the RewardLevelCard component including the card layout,
left and right containers, text styles,
stats containers, and icon display. */
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FDE8DF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftContainer: {
    flex: 2,
  },
  levelText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  subtitleText: {
    fontSize: 18,
    color: "#000",
    marginBottom: 15,
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  stat: {
    alignItems: "center",
    marginRight: 20,
  },
  statAdjusted: {
    alignItems: "center",
    marginLeft: 8,
  },
  statLabel: {
    fontSize: 12,
    color: "#FF6600",
    marginBottom: 5,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  rightContainer: {
    flex: 1,
    alignItems: "center",
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  viewProgressText: {
    fontSize: 14,
    color: "#FF6600",
    textAlign: "center",
  },
});
