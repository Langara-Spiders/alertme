import { Text, View } from "@gluestack-ui/themed";
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";

import { FormattedMessage } from "react-intl";
import SvgUri from "react-native-svg-uri";
import ConfirmedHazard from "../../assets/icons/map_markers/conf_hazard_icon.png";
import ArrowLeft from "../../assets/icons/System_Icons/ArrowLeft.svg";
import { SwitchIconCard } from "../../components/molecules";

const AllowPermissions = (props) => {
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [cameraEnabled, setCameraEnabled] = useState(false);

  const isContinueEnabled =
    locationEnabled || notificationEnabled || cameraEnabled;

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image source={ConfirmedHazard} height={40} width={40} />
      </View>
      <View>
        <Text style={styles.text1}>
          <FormattedMessage
            id="Signup.AllowPermissions.heading"
            defaultMessage="Allow Permissions"
          />
        </Text>
        <Text style={styles.text2}>
          <FormattedMessage
            id="Signup.AllowPermissions.subheading"
            defaultMessage="To get started we need your permission to configure this app"
          />
        </Text>
      </View>
      <View>
        <SwitchIconCard
          type="Location"
          value={locationEnabled}
          setValue={setLocationEnabled}
        />
        <SwitchIconCard
          type="Notification"
          value={notificationEnabled}
          setValue={setNotificationEnabled}
        />
        <SwitchIconCard
          type="Camera"
          value={cameraEnabled}
          setValue={setCameraEnabled}
        />
      </View>

      <View style={styles.bothButtons}>
        <TouchableOpacity style={styles.touch}>
          <SvgUri
            source={ArrowLeft}
            height={30}
            width={30}
            style={styles.touchIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.touchcontinue,
            !isContinueEnabled && styles.disabledButton,
          ]}
          disabled={!isContinueEnabled}
        >
          <Text style={isContinueEnabled && styles.continueButtonText}>
            <FormattedMessage
              id="Signup.AllowPermissions.button"
              defaultMessage="Continue"
            />
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AllowPermissions;

const styles = StyleSheet.create({
  container: {
    gap: 20,
    padding: 20,
  },
  text1: {
    fontSize: 30,
    fontWeight: "bold",
    multiline: true,
  },
  text2: {
    fontSize: 18,
    multiline: true,
  },
  touch: {
    backgroundColor: "#F3F4F4",
    borderRadius: 10,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginTop: 20,
    bottom: 0,
  },
  touchcontinue: {
    backgroundColor: "#FF6B00",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginTop: 20,
    bottom: 0,
    width: 100,
  },
  disabledButton: {
    backgroundColor: "#DBDDDE",
  },
  continueButtonText: {
    color: "#FFFFFF",
  },
  bothButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
