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
import { Button, SwitchButton, UnitSwitch } from "../atoms";

import { useNavigation } from "@react-navigation/native";
import { FormattedMessage } from "react-intl";
import { StyleSheet } from "react-native";

const AppSettingArray = [
  { id: "applicationSound", text: "Application Sound" },
  { id: "accessLocation", text: "Access Location" },
  { id: "accessCamera", text: "Access Camera" },
  { id: "notification", text: "Notification" },
];

const ProfileAppSettingItems = () => {
  const [isKm, setIsKm] = useState(false);
  const navigation = useNavigation();

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
        <Select>
          <SelectTrigger variant="outline" size="md">
            <SelectInput placeholder="English" />
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
              <SelectItem label="French" value="french" />
              <SelectItem label="English" value="english" />
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

      {AppSettingArray.map((item) => (
        <View key={item.id}>
          <Card style={styles.settingItem2}>
            <View>
              <Text>
                <FormattedMessage
                  id={`profile.appsettingTextOption.${item.id}`}
                  defaultMessage={item.text}
                  values={{ text: item.text }}
                />
              </Text>
            </View>
            <View>
              <SwitchButton
                onValueChange={() => handleSwitchChange(item.id)}
                value={switchValues[item.id]}
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
