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

// Feature `Rewards`.
const Rewards = (props) => {
  const intl = useIntl();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getReward();
        console.log("API response data:", response.data);

        // Check if response.data exists and is not null
        if (response.data) {
          const { user_details, leaderboard } = response.data;
          setData({
            user: user_details,
            leaderboard: leaderboard,
          });
        } else {
          // Handle the case where response.data is null or undefined
          throw new Error("No data found in the response");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching reward data:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Image source={ABCD} style={styles.loadingIcon} alt="loader image" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Error loading data: {error.message}
        </Text>
      </View>
    );
  }

  if (!data || !data.user) {
    console.error("Data or user is undefined", { data });
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading data</Text>
      </View>
    );
  }

  const { user, leaderboard } = data;

  console.log("Processed leaderboard data:", leaderboard);

  const calculateLevel = (points) => {
    return Math.floor(points / 5);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <RewardGreetingCard
          name={user.name ?? "Unknown"}
          avatar={user.picture ?? "https://picsum.photos/200/300"}
        />
      </View>
      <View>
        <Text style={styles.levelCardText}>
          <FormattedMessage
            id="Rewards.issueReported"
            defaultMessage="Issue Reported"
          />
        </Text>
      </View>
      <View style={styles.levelCardContainer}>
        <RewardLevelCard
          level={calculateLevel(user.points).toString() ?? "N/A"}
          earned={user.points?.toString() ?? "0"}
          reported={user.points?.toString() ?? "0"} // Using points for issues reported
          icon={ABCD}
        />
      </View>
      <View style={styles.leaderboardHeader}>
        <Text style={styles.leaderboardText}>
          <FormattedMessage
            id="Rewards.leaderBoard"
            defaultMessage="Leaderboard"
          />
        </Text>
        <TouchableOpacity
          onPress={() => {
            try {
              navigation.navigate(routes.LEADERBOARD, {
                leaderboard: leaderboard,
              });
            } catch (error) {
              console.error("Error navigating to leaderboard:", error);
            }
          }}
        >
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.leaderboardContainer}>
        {leaderboard.map((leader, index) => {
          console.log("Rendering leader:", leader);
          return (
            <LeaderBoardCard
              key={index}
              avatar={leader.picture ?? ABCD}
              name={leader.name ?? "Unknown"}
              level={calculateLevel(leader.points).toString() ?? "N/A"}
              points={leader.points?.toString() ?? "0"}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

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

export default Rewards;
