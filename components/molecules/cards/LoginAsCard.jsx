import { Card, HStack, VStack, View } from "@gluestack-ui/themed";
import { StyleSheet, TouchableOpacity } from "react-native";
import Image from "../../atoms/Image";
import Typography from "../../atoms/Typography";

const LoginAsCard = (props) => {
  const handlePress = () => {
    console.log(`${props.userType} card pressed`);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.touchable}>
      <Card style={styles.card}>
        {props.userType === "civilian" ? (
          <>
            <HStack style={styles.hStack} space="md">
              <Image
                source={"https://picsum.photos/200/300"}
                alt="Civilian Icon"
                style={styles.icon}
              />
              <View style={styles.view}>
                <VStack>
                  <Typography size="$4xl" style={styles.title}>
                   I’m Civilian
                  </Typography>
                  <Typography size="$md" style={styles.description}>
                  Community civilians can select this option to proceed further
                  </Typography>
                </VStack>
              </View>
            </HStack>
          </>
        ) : (
          <>
            <HStack style={styles.hStack} space="md">
              <Image
                source={"https://picsum.photos/200/300"}
                alt="Organization Icon"
                style={styles.icon}
              />
              <View style={styles.view}>
                <VStack>
                  <Typography size="$lg" style={styles.title}>
                  Construction Worker
                  </Typography>
                  <Typography size="body1" style={styles.description}>
                  Construction employee can select this option to proceed further
                  </Typography>
                </VStack>
              </View>
            </HStack>
          </>
        )}
      </Card>
    </TouchableOpacity>
  );
};

export default LoginAsCard;

const styles = StyleSheet.create({
  touchable: {
    marginBottom: 8,
  },
  card: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    flexDirection: "row",
    justifyContent: "start",
    backgroundColor: "#F3F4F4",
    marginTop: 10,
    marginBottom: 8,
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
