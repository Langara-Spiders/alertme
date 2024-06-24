import { View } from "@gluestack-ui/themed";

import About from "../../assets/icons/Profile/About.svg";
import Appearance from "../../assets/icons/Profile/Appearance.svg";
import ProfileUser from "../../assets/icons/Profile/ProfileUser.svg";
import Setting from "../../assets/icons/Profile/Setting.svg";
import Share from "../../assets/icons/Profile/Share.svg";
import ProfileItemsWithIcon from "../molecules/ProfileItemsWithIcon";

const ProfileItemsList = () => {
  const items = [
    { icon: ProfileUser, text: "Profile Details" },
    { icon: Setting, text: "App Setting" },
    { icon: Share, text: "Share" },
    { icon: Appearance, text: "Appearance" },
    { icon: About, text: "About" },
  ];

  return (
    <View>
      {items.map((item, index) => (
        <ProfileItemsWithIcon key={index} text={item.text} icon={item.icon} />
      ))}
    </View>
  );
};

export default ProfileItemsList;
