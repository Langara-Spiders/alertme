import { Pressable, ScrollView, Text, View } from "@gluestack-ui/themed";
import { LeaderBoardCard, TopThreeCard } from "../../components/molecules";

import React from "react";
import { StyleSheet } from "react-native";
import SvgUri from "react-native-svg-uri";
import FirstPlaceBanner from "../../assets/icons/Reward_screen/FirstPlaceBanner.svg";
import SecondPlaceBanner from "../../assets/icons/Reward_screen/SecondPlaceBanner.svg";
import ThirdPlaceBanner from "../../assets/icons/Reward_screen/ThirdPlaceBanner.svg";
import Back_Icon from "../../assets/icons/System_Icons/Back_Icon_Filled.svg";
// Import top place banners
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";

const Leaderboard = (props) => {
  const { leaderboard, top_users } = props.route.params;
  const navigation = useNavigation();

  const calculateLevel = (points) => Math.floor(points / 150) + 1;

  if (!leaderboard || leaderboard.length < 3) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Insufficient leaderboard data</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={[
        "rgba(255, 220, 194, 0.0)",
        "rgba(255, 220, 194, 0.0)",
        "rgba(255, 220, 194, 0.0)",
        "#FFDCC2",
        "#FFDCC2",
        "#FFDCC2",
        "#FFDCC2",
        "rgba(255, 220, 194, 0.0)",
      ]}
      style={styles.container}
    >
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.iconContainer}
        >
          <SvgUri
            width="24"
            height="24"
            source={Back_Icon}
            style={styles.icon}
          />
        </Pressable>
        <Text style={styles.headerText}>Leaderboard</Text>
      </View>
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
      </View>
    </LinearGradient>
  );
};

export default Leaderboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF0E5",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#F3F4F4",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  icon: {
    width: 24,
    height: 24,
    opacity: 0.5,
    color: "#0B0C0C",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0B0C0C",
  },
  topThreeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    marginBottom: 20,
    marginTop: 84,
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
