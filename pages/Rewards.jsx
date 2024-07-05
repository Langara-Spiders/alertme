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
        const { user_details, top_users } = response.data;
        setData({
          user: user_details,
          topUsers: top_users,
        });
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

  const { user, topUsers } = data;

  console.log("Processed top users data:", topUsers);

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
          level={user.level?.toString() ?? "N/A"}
          earned={user.points?.toString() ?? "0"}
          reported={user.confirmed_issues?.toString() ?? "0"}
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
                leaderboard: topUsers,
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
        {topUsers.map((leader, index) => {
          console.log("Rendering leader:", leader);
          return (
            <LeaderBoardCard
              key={index}
              avatar={leader.picture ?? ABCD}
              name={leader.name ?? "Unknown"}
              level={leader.level?.toString() ?? "N/A"}
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

// import { Image, ScrollView, Text, View } from "@gluestack-ui/themed";
// import { useNavigation } from "@react-navigation/native";
// import React, { useEffect, useState } from "react";
// import { FormattedMessage, useIntl } from "react-intl";
// import { StyleSheet, TouchableOpacity } from "react-native";
// import ABCD from "../assets/images/sample_user.png";
// import Badge1 from "../assets/badges/badge1.png";
// import Badge2 from "../assets/badges/badge2.png";
// import Badge3 from "../assets/badges/badge3.png";
// // Import all other badge PNGs similarly...

// import {
//   LeaderBoardCard,
//   RewardGreetingCard,
//   RewardLevelCard,
// } from "../components/molecules";
// import { routes } from "../constants";

// const badges = {
//   1: Badge1,
//   2: Badge2,
//   3: Badge3,
//   // Map all other levels to their respective badges...
// };

// const mockData = {
//   leaderboard: [
//     { avatar: ABCD, name: "Dulce Carder", level: 15, points: 13343 },
//     { avatar: ABCD, name: "Craig Septimus", level: 14, points: 12104 },
//     { avatar: ABCD, name: "Ann Dokidis", level: 12, points: 11048 },
//     { avatar: ABCD, name: "Ahmad Arcand", level: 11, points: 9958 },
//     { avatar: ABCD, name: "Zara Faust", level: 13, points: 12560 },
//     { avatar: ABCD, name: "Elijah Moss", level: 10, points: 9230 },
//     { avatar: ABCD, name: "Xander Hale", level: 14, points: 11800 },
//     { avatar: ABCD, name: "Mariah Garrison", level: 12, points: 10500 },
//     { avatar: ABCD, name: "Jaxon Bradshaw", level: 11, points: 9850 },
//     { avatar: ABCD, name: "Willow Banks", level: 13, points: 12870 },
//     { avatar: ABCD, name: "Sophia Turner", level: 12, points: 11200 },
//     { avatar: ABCD, name: "Aiden Barnes", level: 14, points: 13050 },
//     { avatar: ABCD, name: "Isla Moore", level: 10, points: 9000 },
//     { avatar: ABCD, name: "Liam Kelly", level: 15, points: 13500 },
//   ],
//   user: {
//     name: "Sample User",
//     level: 3, // Add the current user's level
//     picture: ABCD,
//   },
// };

// const Rewards = (props) => {
//   const intl = useIntl();
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigation = useNavigation();

//   useEffect(() => {
//     // Use mock data instead of fetching from API
//     setData(mockData.user);
//     setLoading(false);
//   }, []);

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <Image source={ABCD} style={styles.loadingIcon} alt="loader image" />
//       </View>
//     );
//   }

//   if (!data) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text style={styles.errorText}>No data available</Text>
//       </View>
//     );
//   }

//   // Sort leaderboard data by points in descending order
//   const sortedLeaderboard = [...mockData.leaderboard].sort((a, b) => b.points - a.points);

//   // Get the badge for the current user's level
//   const userBadge = badges[data.level] || ABCD;

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <RewardGreetingCard
//           name={data.name ?? "Unknown User"}
//           avatar={data.picture ?? "https://picsum.photos/200/300"}
//         />
//       </View>
//       <View>
//         <Text style={styles.levelCardText}>
//           <FormattedMessage
//             id="Rewards.issueReported"
//             defaultMessage="Issue Reported"
//           />
//         </Text>
//       </View>
//       <View style={styles.levelCardContainer}>
//         <RewardLevelCard level={data.level} earned="214" reported="58" icon={userBadge} />
//       </View>
//       <View style={styles.leaderboardHeader}>
//         <Text style={styles.leaderboardText}>
//           <FormattedMessage
//             id="Rewards.leaderBoard"
//             defaultMessage="Leaderboard"
//           />
//         </Text>
//         <TouchableOpacity
//           onPress={() =>
//             navigation.navigate(routes.LEADERBOARD, {
//               leaderboard: sortedLeaderboard,
//             })
//           }
//         >
//           <Text style={styles.viewAllText}>View All</Text>
//         </TouchableOpacity>
//       </View>
//       <ScrollView style={styles.leaderboardContainer}>
//         {sortedLeaderboard.map((leader, index) => {
//           const badge = badges[leader.level] || ABCD;
//           return (
//             <LeaderBoardCard
//               key={index}
//               avatar={leader.avatar}
//               name={leader.name}
//               level={leader.level.toString()}
//               points={leader.points.toString()}
//               icon={badge}
//             />
//           );
//         })}
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFF0E5",
//     padding: 20,
//   },
//   header: {
//     marginBottom: 20,
//     height: 100,
//   },
//   levelCardText: {
//     color: "black",
//     fontSize: 14,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   levelCardContainer: {
//     marginBottom: 20,
//   },
//   leaderboardHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   leaderboardText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#1E1E1E",
//   },
//   viewAllText: {
//     fontSize: 14,
//     color: "#FF9900",
//   },
//   leaderboardContainer: {
//     flex: 1,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   loadingIcon: {
//     width: 50,
//     height: 50,
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   errorText: {
//     fontSize: 18,
//     color: "red",
//   },
// });

// export default Rewards;
