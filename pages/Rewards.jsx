import { Image, ScrollView, Text, View } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import ABCD from "../assets/favicon.png";
import {
  LeaderBoardCard,
  RewardGreetingCard,
  RewardLevelCard,
} from "../components/molecules";

/* The `mockData` constant is storing a mock data object 
that represents user and leaderboard
information. Here's a breakdown of the data structure: */
const mockData = {
  user: {
    name: "Maya",
    avatar: ABCD,
    level: 3,
    subtitle: "Incident Reported",
    completed: 312,
    progress: "05",
  },
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
const Rewards = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  /* The `useEffect` hook in the provided code snippet 
is used to perform side effects in a functional
component. In this specific case: setData, setLoading*/
  useEffect(() => {
    setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 2000);
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
        <RewardGreetingCard name={data.user.name} avatar={data.user.avatar} />
      </View>
      <View>
        <Text style={styles.levelCardText}>Issue Reported</Text>
      </View>
      <View style={styles.levelCardContainer}>
        <RewardLevelCard
          level={data.user.level}
          subtitle={data.user.subtitle}
          completed={data.user.completed.toString()}
          progress={data.user.progress}
          icon={ABCD}
        />
      </View>
      <View style={styles.leaderboardHeader}>
        <Text style={styles.leaderboardText}>Leaderboard</Text>
        <Text style={styles.viewAllText}>View All</Text>
      </View>
      <ScrollView style={styles.leaderboardContainer}>
        {data.leaderboard.map((leader, index) => (
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
