import { Image, ScrollView, Text, View } from "@gluestack-ui/themed";
import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Badge from "../assets/badges/badge1.png"; // Use the same badge image

const IssuesReportedAwards = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { totalReported, earnedBadges, earnedPoints, achievedLevel } =
    route.params;

  return (
    <ScrollView style={styles.container} fadingEdgeLength={150}>
      <TouchableOpacity onPress={() => navigation.goBack()}></TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.headerText}>Issues Reported Awards </Text>
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
            <Text style={styles.detailValue}>{earnedBadges}/50</Text>
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
          {Array.from({ length: earnedBadges }).map((_, index) => (
            <View key={index} style={styles.badgeItem}>
              <Image source={Badge} style={styles.badgeImage} />
              <Text style={styles.badgeText}>Level {achievedLevel}</Text>
              <Text style={styles.badgeReports}>5 Reports</Text>
            </View>
          ))}
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
