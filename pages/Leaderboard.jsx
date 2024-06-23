import { ScrollView, View } from "@gluestack-ui/themed";
import React from "react";
import { StyleSheet } from "react-native";
import { LeaderBoardCard, TopThreeCard } from "../components/molecules";

const Leaderboard = (props) => {
  const { leaderboard } = props.route.params;

  return (
    <View style={styles.container}>
      <View style={styles.topThreeContainer}>
        <TopThreeCard
          rank={2}
          name={leaderboard[1].name}
          level={leaderboard[1].level}
          avatar={leaderboard[1].avatar}
        />
        <TopThreeCard
          rank={1}
          name={leaderboard[0].name}
          level={leaderboard[0].level}
          avatar={leaderboard[0].avatar}
        />
        <TopThreeCard
          rank={3}
          name={leaderboard[2].name}
          level={leaderboard[2].level}
          avatar={leaderboard[2].avatar}
        />
      </View>
      <ScrollView style={styles.leaderboardContainer}>
        {leaderboard.map((leader, index) => (
          <LeaderBoardCard
            key={index}
            avatar={leader.avatar}
            name={leader.name}
            level={leader.level.toString()}
            points={leader.points.toString()}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Leaderboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF0E5",
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1E1E1E",
    marginBottom: 20,
    textAlign: "center",
  },
  topThreeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  leaderboardContainer: {
    flex: 1,
  },
});
