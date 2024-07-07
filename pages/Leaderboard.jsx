import { ScrollView, Text, View } from "@gluestack-ui/themed";
import React from "react";
import { StyleSheet } from "react-native";
import { LeaderBoardCard, TopThreeCard } from "../components/molecules";

const Leaderboard = (props) => {
  const { leaderboard } = props.route.params;

  if (!leaderboard || leaderboard.length < 3) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Insufficient leaderboard data</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topThreeContainer}>
        <TopThreeCard
          rank={2}
          name={leaderboard[1]?.name ?? "Unknown"}
          level={leaderboard[1]?.level?.toString() ?? "N/A"}
          avatar={leaderboard[1]?.picture ?? ""}
        />
        <TopThreeCard
          rank={1}
          name={leaderboard[0]?.name ?? "Unknown"}
          level={leaderboard[0]?.level?.toString() ?? "N/A"}
          avatar={leaderboard[0]?.picture ?? ""}
        />
        <TopThreeCard
          rank={3}
          name={leaderboard[2]?.name ?? "Unknown"}
          level={leaderboard[2]?.level?.toString() ?? "N/A"}
          avatar={leaderboard[2]?.picture ?? ""}
        />
      </View>
      <ScrollView style={styles.leaderboardContainer}>
        {leaderboard.map((leader, index) => (
          <LeaderBoardCard
            key={index}
            avatar={leader?.picture ?? ""}
            name={leader?.name ?? "Unknown"}
            level={leader?.level?.toString() ?? "N/A"}
            points={leader?.points?.toString() ?? "0"}
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
  topThreeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  leaderboardContainer: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
});
