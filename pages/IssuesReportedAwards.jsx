import { Image, ScrollView, Text, View } from "@gluestack-ui/themed";
import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

// Import all active badges
const A1 = require("../assets/badges/A1.png");
const A2 = require("../assets/badges/A2.png");
const A3 = require("../assets/badges/A3.png");
const A4 = require("../assets/badges/A4.png");
const A5 = require("../assets/badges/A5.png");
const A6 = require("../assets/badges/A6.png");
const A7 = require("../assets/badges/A7.png");
const A8 = require("../assets/badges/A8.png");
const A9 = require("../assets/badges/A9.png");
const A10 = require("../assets/badges/A10.png");

// Import all inactive badges
const Inactive1 = require("../assets/badges/In-active 1.png");
const Inactive2 = require("../assets/badges/In-active 2.png");
const Inactive3 = require("../assets/badges/In-active 3.png");
const Inactive4 = require("../assets/badges/In-active 4.png");
const Inactive5 = require("../assets/badges/In-active 5.png");
const Inactive6 = require("../assets/badges/In-active 6.png");
const Inactive7 = require("../assets/badges/In-active 7.png");
const Inactive8 = require("../assets/badges/In-active 8.png");
const Inactive9 = require("../assets/badges/In-active 9.png");
const Inactive10 = require("../assets/badges/In-active 10.png");

const activeBadges = [A1, A2, A3, A4, A5, A6, A7, A8, A9, A10];

const inactiveBadges = [
  Inactive1,
  Inactive2,
  Inactive3,
  Inactive4,
  Inactive5,
  Inactive6,
  Inactive7,
  Inactive8,
  Inactive9,
  Inactive10,
];

const IssuesReportedAwards = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { totalReported, earnedBadges, earnedPoints, achievedLevel } =
    route.params;

  const renderBadge = (index) => {
    const isActive = index < achievedLevel;
    const BadgeComponent = isActive
      ? activeBadges[index]
      : inactiveBadges[index];

    const badgeText = `Level ${index + 1}`;

    return (
      <View key={index} style={styles.badgeItem}>
        <Image source={BadgeComponent} style={styles.badgeImage} />
        <Text style={styles.badgeText}>{badgeText}</Text>
        <Text style={styles.badgeReports}>5 Reports</Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} fadingEdgeLength={150}>
      <TouchableOpacity onPress={() => navigation.goBack()}></TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.headerText}>Issues Reported Awards</Text>
      </View>
      <View style={styles.achievementContainer}>
        <Text style={styles.achievementTitle}>
          Achieved Level {achievedLevel}
        </Text>
        <View style={styles.achievementDetails}>
          <View style={styles.detailBox}>
            <Text style={styles.detailText}>Total Reported</Text>
            <Text style={styles.detailValue}>{totalReported}</Text>
          </View>
          <View style={styles.detailBox}>
            <Text style={styles.detailText}>Earned Badges</Text>
            <Text style={styles.detailValue}>{earnedBadges}/10</Text>
          </View>
          <View style={styles.detailBox}>
            <Text style={styles.detailText}>Earned Points</Text>
            <Text style={styles.detailValue}>{earnedPoints}</Text>
          </View>
        </View>
      </View>
      <View style={styles.challengeBoard}>
        <Text style={styles.challengeTitle}>
          Awards for completing challenges that celebrate special moments in
          time.
        </Text>
        <View style={styles.badgesContainer}>
          {Array.from({ length: 10 }).map((_, index) => renderBadge(index))}
        </View>
      </View>
    </ScrollView>
  );
};

export default IssuesReportedAwards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  backButton: {
    color: "#000",
    fontSize: 16,
    marginBottom: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  achievementContainer: {
    backgroundColor: "#F5F5F5",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  achievementTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  achievementDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailBox: {
    alignItems: "center",
  },
  detailText: {
    fontSize: 14,
    color: "#888",
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  challengeBoard: {
    marginBottom: 20,
  },
  challengeTitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  badgesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  badgeItem: {
    width: "30%",
    alignItems: "center",
    marginBottom: 20,
  },
  badgeImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  badgeReports: {
    fontSize: 12,
    color: "#888",
  },
});
