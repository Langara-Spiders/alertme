import {
  ArrowLeftIcon,
  FlatList,
  Icon,
  Pressable,
  Text,
  View,
} from "@gluestack-ui/themed";

import React from "react";
import { FormattedMessage } from "react-intl";
import { StyleSheet } from "react-native";
import Button from "../components/atoms/buttons/Button";
import { IncidentCard } from "../components/molecules";
import { routes } from "../constants";

const AllIncidentsArrray = [
  {
    id: 1,
    status: "Active",
    title: "Oil Spilled On Road",
    distance: "0.21 km away",
    location: "121, 51A Main Street",
    date: "June 1st 2024",
    time: "02:43 PM",
    upvote: 1,
  },
  {
    id: 2,
    status: "Pending",
    title: "Pothole",
    distance: "0.21 km away",
    location: "121, 51A Main Street",
    date: "June 1st 2024",
    time: "02:43 PM",
    upvote: 3,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    status: "Resolved",
    title: "Broken Street Light",
    distance: "0.21 km away",
    location: "121, 51A Main Street",
    date: "June 1st 2024",
    time: "02:43 PM",
    upvote: 5,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    status: "Active",
    title: "Oil Spilled On Road",
    distance: "0.21 km away",
    location: "121, 51A Main Street",
    date: "June 1st 2024",
    time: "02:43 PM",
    upvote: 1,
  },
  {
    id: 5,
    status: "Pending",
    title: "Pothole",
    distance: "0.21 km away",
    location: "121, 51A Main Street",
    date: "June 1st 2024",
    time: "02:43 PM",
    upvote: 3,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 6,
    status: "Resolved",
    title: "Broken Street Light",
    distance: "0.21 km away",
    location: "121, 51A Main Street",
    date: "June 1st 2024",
    time: "02:43 PM",
    upvote: 5,
    image: "https://via.placeholder.com/150",
  },
];

const Incidents = (props) => {
  const { navigation } = props;

  const renderItem = ({ item }) => (
    <IncidentCard
      title={item.title}
      location={item.location}
      date={item.date}
      time={item.time}
      image={item.image}
      upvote={item.upvote}
    />
  );

  const ItemSeparator = () => <View style={styles.separator} />;

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate(routes.HOME)}>
          <Icon as={ArrowLeftIcon} />
        </Pressable>

        <Text>My Posted Issues</Text>
      </View>
      <View style={styles.subcontainer}>
        <Button>
          <FormattedMessage id="incidentspage.button1" defaultMessage="All" />
        </Button>
        <Button style={{ backgroundColor: "white", width: "25%" }}>
          <FormattedMessage
            id="incidentsPage.button2"
            defaultMessage="Active"
          />
        </Button>
        <Button style={{ backgroundColor: "white", width: "30%" }}>
          <FormattedMessage
            id="incidentsPage.button3"
            defaultMessage="Pending"
          />
        </Button>
        <Button style={{ backgroundColor: "white", width: "30%" }}>
          <FormattedMessage
            id="incidentsPage.button4"
            defaultMessage="Resolved"
          />
        </Button>
      </View>

      <View style={{ flex: 1, padding: 10 }}>
        <FlatList
          data={AllIncidentsArrray}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={ItemSeparator}
        />
      </View>
    </View>
  );
};

export default Incidents;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
    padding: 10,
  },
  subcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  separator: {
    height: 10,
    // backgroundColor: "#CED0CE",
  },
});
