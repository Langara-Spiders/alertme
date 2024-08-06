import {
  ChevronDownIcon,
  Icon,
  Pressable,
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
import { Image, StyleSheet } from "react-native";
import { Button, SwitchButton } from "../atoms";

import { useNavigation } from "@react-navigation/native";
import { FormattedMessage } from "react-intl";
import SvgUri from "react-native-svg-uri";
import Back_Icon from "../../assets/icons/System_Icons/ArrowLeft.svg";
import franceFlag from "../../assets/images/Flags/france.png";
import indianFlag from "../../assets/images/Flags/ind.png";
import usFlag from "../../assets/images/Flags/us.png";

const languages = [
  { label: "English", value: "english", image: usFlag },
  { label: "French", value: "french", image: franceFlag },
  { label: "Punjabi", value: "punjabi", image: indianFlag },
];

const AppSettingArray = [
  { id: "applicationSound", text: "Application Sound" },
  { id: "accessLocation", text: "Access Location" },
  { id: "accessCamera", text: "Access Camera" },
  { id: "notification", text: "Notification" },
];

const ProfileAppSettingItems = () => {
  const [isKm, setIsKm] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0].value);
  const navigation = useNavigation();

  const [switchValues, setSwitchValues] = useState({
    applicationSound: false,
    accessLocation: false,
    accessCamera: false,
    notification: false,
    showTraffic: false,
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
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.navigate("Profile")}
          style={styles.iconContainer}
        >
          <SvgUri
            width="24"
            height="24"
            source={Back_Icon}
            style={styles.icon}
          />
        </Pressable>
        <Text style={styles.headerText}>
          <FormattedMessage
            id="profile.appsetting.headerText"
            defaultMessage="App Settings"
          />
        </Text>
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.textLang}>
          <FormattedMessage
            id="profile.appsettingLanguageText"
            defaultMessage="Language"
          />
        </Text>
        <Select
          value={selectedLanguage}
          onValueChange={(value) => setSelectedLanguage(value)}
        >
          <SelectTrigger style={styles.select} size="md">
            <View style={styles.selectedItem}>
              <Image
                source={
                  languages.find((lang) => lang.value === selectedLanguage)
                    .image
                }
                style={styles.flag}
              />
              <SelectInput
                placeholder={
                  languages.find((lang) => lang.value === selectedLanguage)
                    .label
                }
                style={styles.input}
              />
            </View>
            <SelectIcon mr="$3" style={{ position: "absolute", right: 0 }}>
              <Icon as={ChevronDownIcon} />
            </SelectIcon>
          </SelectTrigger>
          <SelectPortal>
            <SelectBackdrop />
            <SelectContent>
              <SelectDragIndicatorWrapper>
                <SelectDragIndicator />
              </SelectDragIndicatorWrapper>
              {languages.map((lang) => (
                <SelectItem
                  label={lang.label}
                  value={lang.value}
                  key={lang.value}
                >
                  <View style={styles.itemContainer}>
                    <Image source={lang.image} style={styles.flag} />
                    <Text>
                      <FormattedMessage
                        id={`profile.appsettingLanguageText.${lang.value}`}
                        defaultMessage={lang.label}
                      />
                    </Text>
                  </View>
                </SelectItem>
              ))}
            </SelectContent>
          </SelectPortal>
        </Select>
      </View>

      {/* Uncomment and use this block if UnitSwitch is defined
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
      </View> */}

      {/* {AppSettingArray.map((item) => (
        <View key={item.id}>
          <View style={styles.settingItem2}>
            <View>
              <Text style={styles.text}>
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
                trackColor={{ false: "#e0e0e0", true: "#FF6B00" }}
              />
            </View>
          </View>
        </View>
      ))} */}

      <View style={styles.settingItem2}>
        <View>
          <Text style={styles.text}>
            <FormattedMessage
              id="profile.appsettingTextOption.showTraffic"
              defaultMessage="Show Traffic"
              values={{ text: "Show Traffic" }}
            />
          </Text>
        </View>
        <View>
          <SwitchButton
            onValueChange={() => handleSwitchChange("showTraffic")}
            value={switchValues["showTraffic"]}
            trackColor={{ false: "#e0e0e0", true: "#FF6B00" }}
          />
        </View>
      </View>

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
    marginBottom: 40,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: "#F3F4F4",
    opacity: 0.8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  icon: {
    width: 24,
    height: 24,
    textAlign: "center",
  },
  headerText: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  settingItem2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    backgroundColor: "#F3F4F4",
    borderRadius: 10,
    height: 56,
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  settingItem: {
    marginBottom: 10,
  },
  savebutton: {
    width: "50%",
    margin: "auto",
    marginTop: 400,
  },
  select: {
    backgroundColor: "#F3F4F4",
    height: 56,
    border: 0,
    borderWidth: 0,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  switchButtonContainer: {
    backgroundColor: "#F3F4F4",
  },
  textLang: {
    fontSize: 18,
    marginBottom: 5,
  },
  text: {
    fontSize: 18,
  },
  selectedItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },
  input: {
    marginLeft: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  flag: {
    width: 24,
    height: 24,
  },
});

export default ProfileAppSettingItems;
