import { View } from "@gluestack-ui/themed";
import { FormattedMessage } from "react-intl";
import About from "../../assets/icons/profile_icons/about_icon.png";
import Appearance from "../../assets/icons/profile_icons/appearance_icon.png";
import ProfileUser from "../../assets/icons/profile_icons/profile_icon.png";
import Setting from "../../assets/icons/profile_icons/settings_icon.png";
import Share from "../../assets/icons/profile_icons/share_icon.png";
import ProfileItemsWithIcon from "../molecules/ProfileItemsWithIcon";

const ProfileItemsList = (props) => {
  const items = [
    {
      icon: ProfileUser,
      label: (
        <FormattedMessage
          id="label.profileDeatils"
          defaultMessage="Profile Details"
        />
      ),
      screen: "Profile Details",
    },
    {
      icon: Setting,
      label: (
        <FormattedMessage id="label.appSetting" defaultMessage="App Setting" />
      ),
      screen: "App Setting",
    },
    {
      icon: Share,
      messageId: "sharewithfriends.icon.message",
      label: (
        <FormattedMessage
          id="label.share"
          defaultMessage="Share with Friends"
        />
      ),
      screen: "Share With Friends",
    },
    {
      icon: Appearance,
      label: (
        <FormattedMessage id="label.appearance" defaultMessage="Appearance" />
      ),
      screen: "Appearance",
    },
    {
      icon: About,
      label: <FormattedMessage id="label.about" defaultMessage="About" />,
      screen: "About",
    },
  ];

  return (
    <View>
      {items.map((item, index) => (
        <ProfileItemsWithIcon
          key={index}
          icon={item.icon}
          label={item.label}
          screen={item.screen}
        />
      ))}
    </View>
  );
};

export default ProfileItemsList;
