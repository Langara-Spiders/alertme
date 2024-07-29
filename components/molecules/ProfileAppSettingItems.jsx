import {
  Card,
  ChevronDownIcon,
  Icon,
  ScrollView,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  Text,
  View,
} from "@gluestack-ui/themed";
import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Button, SwitchButton, UnitSwitch } from "../atoms";

import { StyleSheet } from "react-native";
import { useStore } from "../../store";

const ProfileAppSettingItems = () => {
  const intl = useIntl();
  const { setLang, getSettings } = useStore();
  const { lang } = getSettings();
  const [isKm, setIsKm] = useState(false);

  const profileAppSettingItems = [
    {
      label: (
        <FormattedMessage
          id="ProfileAppSettingsItems.settings.sound"
          defaultMessage="Application Sound"
        />
      ),
    },
    {
      label: (
        <FormattedMessage
          id="ProfileAppSettingsItems.settings.location"
          defaultMessage="Access Location"
        />
      ),
    },
    {
      label: (
        <FormattedMessage
          id="ProfileAppSettingsItems.settings.camera"
          defaultMessage="Access Camera"
        />
      ),
    },
    {
      label: (
        <FormattedMessage
          id="ProfileAppSettingsItems.settings.notifications"
          defaultMessage="Push Notifications"
        />
      ),
    },
  ];

  const [switchValues, setSwitchValues] = useState({
    applicationSound: false,
    accessLocation: false,
    accessCamera: false,
    notification: false,
  });

  const handleSwitchChange = (id) => {
    setSwitchValues((prevValues) => ({
      ...prevValues,
      [id]: !prevValues[id],
    }));
  };

  const handleUnitSwitchChange = (value) => {
    setIsKm(value);
  };

  return (
    <ScrollView style={styles.scrollViewContent}>
      <View style={styles.settingItem}>
        <Text style={styles.settingItem}>
          <FormattedMessage
            id="profile.appsettingLanguageText"
            defaultMessage="Language"
          />
        </Text>
        <Select defaultValue selectedValue onValueChange={(e) => setLang(e)}>
          <SelectTrigger variant="outline" size="md">
            <SelectInput
              value={
                lang === "en"
                  ? intl.formatMessage({
                      id: "ProfileAppSettingsItems.lang.english",
                      defaultMessage: "English",
                    })
                  : lang === "fr"
                    ? intl.formatMessage({
                        id: "ProfileAppSettingsItems.lang.french",
                        defaultMessage: "French",
                      })
                    : intl.formatMessage({
                        id: "ProfileAppSettingsItems.lang.punjabi",
                        defaultMessage: "Punjabi",
                      })
              }
            />
            <SelectIcon mr="$3">
              <Icon as={ChevronDownIcon} />
            </SelectIcon>
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              <SelectItem
                label={
                  <FormattedMessage
                    id="ProfileAppSettingsItems.lang.english"
                    defaultMessage="English"
                  />
                }
                value="en"
              />
              <SelectItem
                label={
                  <FormattedMessage
                    id="ProfileAppSettingsItems.lang.french"
                    defaultMessage="French"
                  />
                }
                value="fr"
              />
              <SelectItem
                label={
                  <FormattedMessage
                    id="ProfileAppSettingsItems.lang.punjabi"
                    defaultMessage="Punjabi"
                  />
                }
                value="pa"
              />
            </SelectContent>
          </SelectPortal>
        </Select>
      </View>

      <View style={{ marginTop: "5%" }}>
        <Card style={styles.settingItem2}>
          <Text>
            <FormattedMessage
              id="profile.appsettingDistanceUnitText"
              defaultMessage="Distance Unit"
            />
          </Text>
          <UnitSwitch isKm={isKm} onValueChange={handleUnitSwitchChange} />
        </Card>
      </View>

      {profileAppSettingItems.map((item, idx) => (
        <View key={idx}>
          <Card style={styles.settingItem2}>
            <View>
              <Text>{item?.label}</Text>
            </View>
            <View>
              <SwitchButton
                // onValueChange={() => handleSwitchChange(item.id)}
                // value={switchValues[item.id]}
                trackColor={{ false: "#F1F1F1", true: "#FF9900" }}
              />
            </View>
          </Card>
        </View>
      ))}

      <View style={styles.savebutton}>
        <Button
          variant="primary"
          onPress={() => {
            console.log("Save");
          }}
        >
          <FormattedMessage id="profile.appsettingSave" defaultMessage="Save" />
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  settingItem2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  settingItem: {
    marginBottom: 10,
  },
  savebutton: {
    width: "70%",
    height: "50%",
    margin: "auto",
    marginTop: 20,
  },
});

export default ProfileAppSettingItems;
