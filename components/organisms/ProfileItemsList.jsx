import { View } from "@gluestack-ui/themed";
import About from "../../assets/icons/Profile/About.svg";
import Appearance from "../../assets/icons/Profile/Appearance.svg";
import ProfileUser from "../../assets/icons/Profile/ProfileUser.svg";
import Setting from "../../assets/icons/Profile/Setting.svg";
import Share from "../../assets/icons/Profile/Share.svg";
import ProfileItemsWithIcon from "../molecules/ProfileItemsWithIcon";

const ProfileItemsList = () => {
  const items = [
    {
      icon: ProfileUser,
      messageId: "profiledetails.icon.message",
      defaultMessage: "Profile Details",
    },
    {
      icon: Setting,
      messageId: "appsetting.icon.message",
      defaultMessage: "App Setting",
    },
    {
      icon: Share,
      messageId: "sharewithfriends.icon.message",
      defaultMessage: "Share with friends",
    },
    {
      icon: Appearance,
      messageId: "appearance.icon.message",
      defaultMessage: "Appearance",
    },
    { icon: About, messageId: "about.icon.message", defaultMessage: "About" },
  ];

  return (
    <View>
      {items.map((item, index) => (
        <ProfileItemsWithIcon
          key={index}
          icon={item.icon}
          messageId={item.messageId}
          defaultMessage={item.defaultMessage}
        />
      ))}
    </View>
  );
};

export default ProfileItemsList;
