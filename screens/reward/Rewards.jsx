import { Image, ScrollView, Text, View } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { StyleSheet, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {
  LeaderBoardCard,
  RewardGreetingCard,
  RewardLevelCard,
} from "../../components/molecules";

import { useNavigation } from "@react-navigation/native";
import { getReward } from "../../api/user";
import LoadingGif from "../../assets/loading.gif";
import { routes } from "../../constants";

const A1 = require("../../assets/badges/A1.png");
const A2 = require("../../assets/badges/A2.png");
const A3 = require("../../assets/badges/A3.png");
const A4 = require("../../assets/badges/A4.png");
const A5 = require("../../assets/badges/A5.png");
const A6 = require("../../assets/badges/A6.png");
const A7 = require("../../assets/badges/A7.png");
const A8 = require("../../assets/badges/A8.png");
const A9 = require("../../assets/badges/A9.png");
const A10 = require("../../assets/badges/A10.png");
const A11 = require("../../assets/badges/A11.png");
const A12 = require("../../assets/badges/A12.png");
const A13 = require("../../assets/badges/A13.png");
const A14 = require("../../assets/badges/A14.png");
const A15 = require("../../assets/badges/A15.png");
const A16 = require("../../assets/badges/A16.png");
const A17 = require("../../assets/badges/A17.png");
const A18 = require("../../assets/badges/A18.png");
const A19 = require("../../assets/badges/A19.png");
const A20 = require("../../assets/badges/A20.png");
const A21 = require("../../assets/badges/A21.png");
const A22 = require("../../assets/badges/A22.png");
const A23 = require("../../assets/badges/A23.png");
const A24 = require("../../assets/badges/A24.png");
const A25 = require("../../assets/badges/A25.png");
const A26 = require("../../assets/badges/A26.png");
const A27 = require("../../assets/badges/A27.png");
const A28 = require("../../assets/badges/A28.png");
const A29 = require("../../assets/badges/A29.png");
const A30 = require("../../assets/badges/A30.png");
const A31 = require("../../assets/badges/A31.png");
const A32 = require("../../assets/badges/A32.png");
const A33 = require("../../assets/badges/A33.png");
const A34 = require("../../assets/badges/A34.png");
const A35 = require("../../assets/badges/A35.png");
const A36 = require("../../assets/badges/A36.png");
const A37 = require("../../assets/badges/A37.png");
const A38 = require("../../assets/badges/A38.png");
const A39 = require("../../assets/badges/A39.png");
const A40 = require("../../assets/badges/A40.png");
const A41 = require("../../assets/badges/A41.png");
const A42 = require("../../assets/badges/A42.png");
const A43 = require("../../assets/badges/A43.png");
const A44 = require("../../assets/badges/A44.png");
const A45 = require("../../assets/badges/A45.png");
const A46 = require("../../assets/badges/A46.png");
const A47 = require("../../assets/badges/A47.png");
const A48 = require("../../assets/badges/A48.png");
const A49 = require("../../assets/badges/A49.png");
const A50 = require("../../assets/badges/A50.png");

// Add additional badge imports as needed

const badges = {
  1: A1,
  2: A2,
  3: A3,
  4: A4,
  5: A5,
  6: A6,
  7: A7,
  8: A8,
  9: A9,
  10: A10,
  11: A11,
  12: A12,
  13: A13,
  14: A14,
  15: A15,
  16: A16,
  17: A17,
  18: A18,
  19: A19,
  20: A20,
  21: A21,
  22: A22,
  23: A23,
  24: A24,
  25: A25,
  26: A26,
  27: A27,
  28: A28,
  29: A29,
  30: A30,
  31: A31,
  32: A32,
  33: A33,
  34: A34,
  35: A35,
  36: A36,
  37: A37,
  38: A38,
  39: A39,
  40: A40,
  41: A41,
  42: A42,
  43: A43,
  44: A44,
  45: A45,
  46: A46,
  47: A47,
  48: A48,
  49: A49,
  50: A50,
};

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
        const { user_details, leaderboard, top_users } = response.data;
        setData({
          user: user_details,
          top_users: top_users,
          leaderboard: leaderboard,
        });
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Image
          source={LoadingGif}
          style={styles.loadingIcon}
          alt="loader image"
        />
        <Text>Loading...</Text>
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
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading data</Text>
      </View>
    );
  }

  const { user, leaderboard, top_users } = data;

  const calculateLevel = (points) => {
    return Math.floor(points / 150) + 1;
  };

  const getBadgeForLevel = (level) => {
    return badges[level] || ABCD; // Default to ABCD if no badge is found
  };

  return (
    <LinearGradient
      colors={[
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
        <RewardGreetingCard name={user.name} picture={user.picture} />
      </View>
      <View>
        {/* <Text style={styles.levelCardText}>
          <FormattedMessage
            id="Rewards.issueReported"
            defaultMessage="Issue Reported"
          />
        </Text> */}
      </View>
      <View style={styles.levelCardContainer}>
        <RewardLevelCard
          level={calculateLevel(user.points).toString() ?? "N/A"}
          earned={user.points}
          reported={user.total_issues}
          icon={getBadgeForLevel(calculateLevel(user.points))}
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
                top_users: top_users,
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.leaderboardContainer}
        fadingEdgeLength={150}
      >
        <View style={{ paddingBottom: 100 }}>
          {leaderboard.slice(0, 3).map((leader, index) => {
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
        </View>
      </ScrollView>
    </LinearGradient>
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
    marginBottom: 10,
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
    paddingBottom: 200,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingIcon: {
    width: 100,
    height: 100,
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
