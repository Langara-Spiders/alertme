import { Image, ScrollView, Text, View } from "@gluestack-ui/themed";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity } from "react-native";
import InfoSheet from "../components/organisms/InfoSheet";

import React, { useState } from "react";

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
const A11 = require("../assets/badges/A11.png");
const A12 = require("../assets/badges/A12.png");
const A13 = require("../assets/badges/A13.png");
const A14 = require("../assets/badges/A14.png");
const A15 = require("../assets/badges/A15.png");
const A16 = require("../assets/badges/A16.png");
const A17 = require("../assets/badges/A17.png");
const A18 = require("../assets/badges/A18.png");
const A19 = require("../assets/badges/A19.png");
const A20 = require("../assets/badges/A20.png");
const A21 = require("../assets/badges/A21.png");
const A22 = require("../assets/badges/A22.png");
const A23 = require("../assets/badges/A23.png");
const A24 = require("../assets/badges/A24.png");
const A25 = require("../assets/badges/A25.png");
const A26 = require("../assets/badges/A26.png");
const A27 = require("../assets/badges/A27.png");
const A28 = require("../assets/badges/A28.png");
const A29 = require("../assets/badges/A29.png");
const A30 = require("../assets/badges/A30.png");
const A31 = require("../assets/badges/A31.png");
const A32 = require("../assets/badges/A32.png");
const A33 = require("../assets/badges/A33.png");
const A34 = require("../assets/badges/A34.png");
const A35 = require("../assets/badges/A35.png");
const A36 = require("../assets/badges/A36.png");
const A37 = require("../assets/badges/A37.png");
const A38 = require("../assets/badges/A38.png");
const A39 = require("../assets/badges/A39.png");
const A40 = require("../assets/badges/A40.png");
const A41 = require("../assets/badges/A41.png");
const A42 = require("../assets/badges/A42.png");
const A43 = require("../assets/badges/A43.png");
const A44 = require("../assets/badges/A44.png");
const A45 = require("../assets/badges/A45.png");
const A46 = require("../assets/badges/A46.png");
const A47 = require("../assets/badges/A47.png");
const A48 = require("../assets/badges/A48.png");
const A49 = require("../assets/badges/A49.png");
const A50 = require("../assets/badges/A50.png");

const activeBadges = [
  A1,
  A2,
  A3,
  A4,
  A5,
  A6,
  A7,
  A8,
  A9,
  A10,
  A11,
  A12,
  A13,
  A14,
  A15,
  A16,
  A17,
  A18,
  A19,
  A20,
  A21,
  A22,
  A23,
  A24,
  A25,
  A26,
  A27,
  A28,
  A29,
  A30,
  A31,
  A32,
  A33,
  A34,
  A35,
  A36,
  A37,
  A38,
  A39,
  A40,
  A41,
  A42,
  A43,
  A44,
  A45,
  A46,
  A47,
  A48,
  A49,
  A50,
];

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
const Inactive11 = require("../assets/badges/In-active 11.png");
const Inactive12 = require("../assets/badges/In-active 12.png");
const Inactive13 = require("../assets/badges/In-active 13.png");
const Inactive14 = require("../assets/badges/In-active 14.png");
const Inactive15 = require("../assets/badges/In-active 15.png");
const Inactive16 = require("../assets/badges/In-active 16.png");
const Inactive17 = require("../assets/badges/In-active 17.png");
const Inactive18 = require("../assets/badges/In-active 18.png");
const Inactive19 = require("../assets/badges/In-active 19.png");
const Inactive20 = require("../assets/badges/In-active 20.png");
const Inactive21 = require("../assets/badges/In-active 21.png");
const Inactive22 = require("../assets/badges/In-active 22.png");
const Inactive23 = require("../assets/badges/In-active 23.png");
const Inactive24 = require("../assets/badges/In-active 24.png");
const Inactive25 = require("../assets/badges/In-active 25.png");
const Inactive26 = require("../assets/badges/In-active 26.png");
const Inactive27 = require("../assets/badges/In-active 27.png");
const Inactive28 = require("../assets/badges/In-active 28.png");
const Inactive29 = require("../assets/badges/In-active 29.png");
const Inactive30 = require("../assets/badges/In-active 30.png");
const Inactive31 = require("../assets/badges/In-active 31.png");
const Inactive32 = require("../assets/badges/In-active 32.png");
const Inactive33 = require("../assets/badges/In-active 33.png");
const Inactive34 = require("../assets/badges/In-active 34.png");
const Inactive35 = require("../assets/badges/In-active 35.png");
const Inactive36 = require("../assets/badges/In-active 36.png");
const Inactive37 = require("../assets/badges/In-active 37.png");
const Inactive38 = require("../assets/badges/In-active 38.png");
const Inactive39 = require("../assets/badges/In-active 39.png");
const Inactive40 = require("../assets/badges/In-active 40.png");
const Inactive41 = require("../assets/badges/In-active 41.png");
const Inactive42 = require("../assets/badges/In-active 42.png");
const Inactive43 = require("../assets/badges/In-active 43.png");
const Inactive44 = require("../assets/badges/In-active 44.png");
const Inactive45 = require("../assets/badges/In-active 45.png");
const Inactive46 = require("../assets/badges/In-active 46.png");
const Inactive47 = require("../assets/badges/In-active 47.png");
const Inactive48 = require("../assets/badges/In-active 48.png");
const Inactive49 = require("../assets/badges/In-active 49.png");
const Inactive50 = require("../assets/badges/In-active 50.png");

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
  Inactive11,
  Inactive12,
  Inactive13,
  Inactive14,
  Inactive15,
  Inactive16,
  Inactive17,
  Inactive18,
  Inactive19,
  Inactive20,
  Inactive21,
  Inactive22,
  Inactive23,
  Inactive24,
  Inactive25,
  Inactive26,
  Inactive27,
  Inactive28,
  Inactive29,
  Inactive30,
  Inactive31,
  Inactive32,
  Inactive33,
  Inactive34,
  Inactive35,
  Inactive36,
  Inactive37,
  Inactive38,
  Inactive39,
  Inactive40,
  Inactive41,
  Inactive42,
  Inactive43,
  Inactive44,
  Inactive45,
  Inactive46,
  Inactive47,
  Inactive48,
  Inactive49,
  Inactive50,
];

export { activeBadges, inactiveBadges };

const IssuesReportedAwards = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

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
        <Text style={styles.badgeReports}>100 points</Text>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} fadingEdgeLength={150}>
      <TouchableOpacity onPress={() => navigation.goBack()}></TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.headerText}>Issues Reported Awards</Text>
        <TouchableOpacity onPress={() => setIsSheetOpen(true)}>
          <Image
            source={require("../assets/icons/InfoIcon.png")} // Replace with actual path to your info icon
            style={styles.infoIcon}
          />
        </TouchableOpacity>
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
          {Array.from({ length: 48 }).map((_, index) => renderBadge(index))}
        </View>
      </View>
      <InfoSheet isOpen={isSheetOpen} onClose={() => setIsSheetOpen(false)} />
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  infoIcon: {
    width: 24,
    height: 24,
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
    width: 85,
    height: 85,
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
