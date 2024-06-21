import {
  BellIcon,
  ButtonIcon,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  SearchIcon,
  View,
} from "@gluestack-ui/themed";

import { Button } from "../components/atoms";
import { DBottomSheet } from "../components/organisms";
import { FormattedMessage } from "react-intl";
import MapView from "react-native-maps";
import { StyleSheet } from "react-native";
import { routes } from "../constants";
import { useRef } from "react";

const Home = (props) => {
  const { navigation } = props;
  const panelRef = useRef(null);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.searchContainer}>
        <Input style={{ flex: 1, backgroundColor: "white" }}>
          <InputSlot pl="$3">
            <InputIcon as={SearchIcon} />
          </InputSlot>
          <InputField placeholder="Search..." />
        </Input>
        <Button
          style={styles.button}
          onPress={() => {
            navigation.navigate(routes.NOTIFICATIONS);
          }}
        >
          <ButtonIcon as={BellIcon} />
        </Button>
      </View>
      <View
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MapView
          style={styles.map}
          userInterfaceStyle="dark"
          provider={MapView.PROVIDER_GOOGLEr}
          initialRegion={{
            latitude: 49.225,
            longitude: -123.1076,
            latitudeDelta: 0.02,
            longitudeDelta: 0.03,
          }}
        />
        <View style={styles.buttonsContainer}>
          <Button onPress={() => navigation.navigate(routes.REPORT_INCIDENT)}>
            <FormattedMessage
              id="home.layout"
              defaultMessage="Report Incident"
            />
          </Button>
          <Button onPress={() => panelRef.current.togglePanel()}>
            <FormattedMessage
              id="home.layout"
              defaultMessage="NearBy Incidents"
            />
          </Button>
        </View>
      </View>
      <DBottomSheet ref={panelRef} navigation={navigation} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "grey",
    backgroundColor: "#09090D",
  },
  searchContainer: {
    position: "absolute",
    left: 0,
    top: 20,
    zIndex: 99,
    elevation: 99,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
    width: "100%",
    paddingHorizontal: 10,
  },
  buttonsContainer: {
    position: "absolute",
    left: 0,
    bottom: 10,
    gap: 20,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  reportIncidentBtn: {
    position: "absolute",
    bottom: 10,
    left: 0,
    zIndex: 99,
    elevation: 99,
  },
});
