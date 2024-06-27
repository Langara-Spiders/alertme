import { Image, ScrollView, Text, View } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { StyleSheet, TouchableOpacity } from "react-native";
import { getReward } from "../api/user";
import ABCD from "../assets/images/sample_user.png";
import {
  LeaderBoardCard,
  RewardGreetingCard,
  RewardLevelCard,
} from "../components/molecules";
import { routes } from "../constants";

/* The `mockData` constant is storing a mock data object 
that represents user and leaderboard
information. Here's a breakdown of the data structure: */

const mockData = {
  leaderboard: [
    { avatar: ABCD, name: "Dulce Carder", level: 15, points: 13343 },
    { avatar: ABCD, name: "Craig Septimus", level: 14, points: 12104 },
    { avatar: ABCD, name: "Ann Dokidis", level: 12, points: 11048 },
    { avatar: ABCD, name: "Ahmad Arcand", level: 11, points: 9958 },
    { avatar: ABCD, name: "Ahmad Arcand", level: 11, points: 9958 },
    { avatar: ABCD, name: "Ahmad Arcand", level: 11, points: 9958 },
    { avatar: ABCD, name: "Ahmad Arcand", level: 11, points: 9958 },
  ],
};

// Feature `Rewards`.
const Rewards = (props) => {
  const intl = useIntl();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  /* The `useEffect` hook in the provided code snippet 
is used to perform side effects in a functional
component. In this specific case: setData, setLoading*/
  useEffect(() => {
    const fetchData = async () => {
      const rewardData = await getReward();
      setData(rewardData[0]);
      setLoading(false);
    };

    fetchData();
  }, []);

  /* The `if (loading)` block in the `Rewards` component is a 
conditional check that is used to handle
the rendering of a loading indicator while the data is being 
fetched. */

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Image source={ABCD} style={styles.loadingIcon} alt="loader image" />
      </View>
    );
  }

  /* This component displays the Rewards page with a greeting card, 
a level card, and a scrollable leaderboard.*/

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <RewardGreetingCard
          name={data.name}
          avatar={data.picture ?? "https://picsum.photos/200/300"}
        />
      </View>
      <View>
        <Text style={styles.levelCardText}>
          {" "}
          <FormattedMessage
            id="Rewards.issueReported"
            defaultMessage="Issue Reported"
          />
        </Text>
      </View>
      <View style={styles.levelCardContainer}>
        <RewardLevelCard level="3" earned="214" reported="58" icon={ABCD} />
      </View>
      <View style={styles.leaderboardHeader}>
        <Text style={styles.leaderboardText}>
          <FormattedMessage
            id="Rewards.leaderBoard"
            defaultMessage="Leaderboard"
          />
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(routes.LEADERBOARD, {
              leaderboard: mockData.leaderboard,
            })
          }
        >
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.leaderboardContainer}>
        {mockData.leaderboard.map((leader, index) => (
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

/*Styles for the Rewards page components including the container,
header, level card text, leaderboard, and loading state.*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF0E5",
    padding: 20,
  },
  header: {
    marginBottom: 20,
    height: 100,
  },
  levelCardText: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  levelCardContainer: {
    marginBottom: 20,
  },
  leaderboardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  leaderboardText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E1E1E",
  },
  viewAllText: {
    fontSize: 14,
    color: "#FF9900",
  },
  leaderboardContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingIcon: {
    width: 50,
    height: 50,
  },
});

export default Rewards;
