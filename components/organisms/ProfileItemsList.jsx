import { View } from "@gluestack-ui/themed";
import { FormattedMessage } from "react-intl";
import AboutIcon from "../../assets/icons/profile_icons/about_icon.png";
import AppearanceIcon from "../../assets/icons/profile_icons/appearance_icon.png";
import ProfileIcon from "../../assets/icons/profile_icons/profile_icon.png";
import SettingsIcon from "../../assets/icons/profile_icons/settings_icon.png";
import ShareIcon from "../../assets/icons/profile_icons/share_icon.png";
import { routes } from "../../constants";
import ProfileItemsWithIcon from "../molecules/ProfileItemsWithIcon";

const ProfileItemsList = (props) => {
  const profileItemsList = [
    {
      icon: ProfileIcon,
      label: (
        <FormattedMessage
          id="ProfileItemsList.profile"
          defaultMessage="Profile Details"
        />
      ),
      route: routes.PROFILE_DETAILS,
    },
    {
      icon: SettingsIcon,
      label: (
        <FormattedMessage
          id="ProfileItemsList.settings"
          defaultMessage="App Settings"
        />
      ),
      route: routes.APP_SETTING,
    },
    {
      icon: ShareIcon,
      label: (
        <FormattedMessage
          id="ProfileItemsList.share"
          defaultMessage="Share with friends"
        />
      ),
      route: routes.SHARE_WITH_FRIENDS,
    },
    {
      icon: AppearanceIcon,
      label: (
        <FormattedMessage
          id="ProfileItemsList.appearance"
          defaultMessage="Appearance"
        />
      ),
      route: routes.APPEARANCE,
    },
    {
      icon: AboutIcon,
      label: (
        <FormattedMessage id="ProfileItemsList.about" defaultMessage="About" />
      ),
      route: routes.ABOUT,
    },
  ];
  return (
    <View>
      {profileItemsList.map((item, idx) => (
        <ProfileItemsWithIcon
          key={idx}
          icon={item?.icon}
          label={item?.label}
          route={item?.route}
        />
      ))}
    </View>
  );
};

export default ProfileItemsList;
