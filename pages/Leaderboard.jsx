import { ScrollView, Text, View } from "@gluestack-ui/themed";
import { LeaderBoardCard, TopThreeCard } from "../components/molecules";

// Import top place banners
import React from "react";
import { StyleSheet } from "react-native";
import FirstPlaceBanner from "../assets/icons/Reward_screen/FirstPlaceBanner.svg";
import SecondPlaceBanner from "../assets/icons/Reward_screen/SecondPlaceBanner.svg";
import ThirdPlaceBanner from "../assets/icons/Reward_screen/ThirdPlaceBanner.svg";

const Leaderboard = (props) => {
  const { leaderboard, top_users } = props.route.params;

  const calculateLevel = (points) => {
    return Math.floor(points / 5) + 1;
  };

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
        <View style={styles.secondPlace}>
          <TopThreeCard
            rank={2}
            name={top_users[1]?.name ?? "Unknown"}
            level={calculateLevel(leaderboard[1]?.points ?? 0).toString()}
            avatar={top_users[1]?.picture ?? ""}
            banner={SecondPlaceBanner}
          />
        </View>
        <View style={styles.firstPlace}>
          <TopThreeCard
            rank={1}
            name={top_users[0]?.name ?? "Unknown"}
            level={calculateLevel(leaderboard[0]?.points ?? 0).toString()}
            avatar={top_users[0]?.picture ?? ""}
            banner={FirstPlaceBanner}
          />
        </View>
        <View style={styles.thirdPlace}>
          <TopThreeCard
            rank={3}
            name={top_users[2]?.name ?? "Unknown"}
            level={calculateLevel(leaderboard[2]?.points ?? 0).toString()}
            avatar={top_users[2]?.picture ?? ""}
            banner={ThirdPlaceBanner}
          />
        </View>
      </View>
      <View style={styles.leaderboardWrapper}>
        <ScrollView style={styles.leaderboardContainer} fadingEdgeLength={150}>
          {leaderboard.map((leader, index) => (
            <LeaderBoardCard
              key={index}
              avatar={leader?.picture ?? ""}
              name={leader?.name ?? "Unknown"}
              level={calculateLevel(leader.points).toString()}
              points={leader.points?.toString() ?? "0"}
            />
          ))}
        </ScrollView>
        <View style={styles.gradientContainer}>
          <View style={styles.gradientPart1} />
          <View style={styles.gradientPart2} />
          <View style={styles.gradientPart3} />
        </View>
      </View>
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
    justifyContent: "center",
    alignItems: "flex-end",
    marginBottom: 20,
    marginTop: 64,
  },
  firstPlace: {
    alignItems: "center",
    marginHorizontal: 10,
    zIndex: 1,
    position: "relative",
    top: -50,
  },
  secondPlace: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  thirdPlace: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  leaderboardWrapper: {
    flex: 1,
    position: "relative",
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
