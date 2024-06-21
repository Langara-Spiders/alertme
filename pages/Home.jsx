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

import { useRef } from "react";
import { FormattedMessage } from "react-intl";
import { StyleSheet } from "react-native";
import { Button } from "../components/atoms";
import { DBottomSheet } from "../components/organisms";
import { routes } from "../constants";

const Home = (props) => {
  const { navigation } = props;
  const panelRef = useRef(null);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.searchContainer}>
        <Input style={{ flex: 1 }}>
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
      <View style={styles.buttonsContainer}>
        <Button onPress={() => navigation.navigate(routes.REPORT_INCIDENT)}>
          <FormattedMessage id="home.layout" defaultMessage="Report Incident" />
        </Button>
        <Button onPress={() => panelRef.current.togglePanel()}>
          <FormattedMessage
            id="home.layout"
            defaultMessage="NearBy Incidents"
          />
        </Button>
      </View>
      <DBottomSheet ref={panelRef} />
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
    width: "100%",
  },
  buttonsContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 60,
  },
});
