import { Card, View } from "@gluestack-ui/themed";

import React from "react";
import { StyleSheet } from "react-native";
import Image from "../../atoms/Image";
import Typography from "../../atoms/Typography";

const LoginAsCard = (props) => {
  return (
    <Card style={styles.card}>
      {props.userType === "civilian" ? (
        <>
          <Image
            source={"https://picsum.photos/200/300"}
            alt="Civilian Icon"
            style={styles.icon}
          />
          <View style={styles.view}>
            <Typography size="$4xl" style={styles.title}>
              Civilian
            </Typography>
            <Typography size="$md" style={styles.description}>
              Daily users should select this option to get started
            </Typography>
          </View>
        </>
      ) : (
        <>
          <Image
            source={"https://picsum.photos/200/300"}
            alt="Organization Icon"
            style={styles.icon}
          />
          <Typography size="$lg" style={styles.title}>
            Organization
          </Typography>
          <Typography size="body1" style={styles.description}>
            Construction worker will select this option
          </Typography>
        </>
      )}
    </Card>
  );
};

export default LoginAsCard;

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  view: {
    flex: 1,
  },
});
