import { View } from "@gluestack-ui/themed";
import { useIntl } from "react-intl";
import About from "../../assets/icons/Profile/About.svg";
import Appearance from "../../assets/icons/Profile/Appearance.svg";
import ProfileUser from "../../assets/icons/Profile/ProfileUser.svg";
import Setting from "../../assets/icons/Profile/Setting.svg";
import Share from "../../assets/icons/Profile/Share.svg";
import { routes } from "../../constants";
import ProfileItemsWithIcon from "../molecules/ProfileItemsWithIcon";

const ProfileItemsList = (props) => {
  const { navigation } = props;
  const intl = useIntl();

  const items = [
    {
      text: intl.formatMessage({
        id: "profiledetails.icon.message",
        defaultMessage: "Profile Details",
      }),
      icon: ProfileUser,
      screen: "ProfileDetails",
    },
    {
      text: intl.formatMessage({
        id: "appsetting.icon.message",
        defaultMessage: "App Setting",
      }),
      icon: Setting,
      screen: routes.APP_SETTING,
    },
    {
      text: intl.formatMessage({
        id: "sharewithfriends.icon.message",
        defaultMessage: "Share with friends",
      }),
      icon: Share,
      screen: "ShareWithFriends",
    },
    {
      text: intl.formatMessage({
        id: "appearance.icon.message",
        defaultMessage: "Appearance",
      }),
      icon: Appearance,
      screen: "Appearance",
    },
    {
      text: intl.formatMessage({
        id: "about.icon.message",
        defaultMessage: "About",
      }),
      icon: About,
      screen: "About",
    },
  ];

  return (
    <View>
      {items.map((item, index) => (
        <ProfileItemsWithIcon
          key={index}
          icon={item.icon}
          text={item.text}
          onPress={() => navigation.navigate(item.screen)}
        />
      ))}
    </View>
  );
};

export default ProfileItemsList;
