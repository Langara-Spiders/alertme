import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  View,
} from "@gluestack-ui/themed";

import { FormattedMessage } from "react-intl";

const ProfileImageEdit = (props) => {
  return (
    <View>
      <Avatar>
        <AvatarImage source={{ uri: "props.image" }} />
        <AvatarFallbackText>
          <FormattedMessage
            id="profile.avatar"
            defaultMessage="name: {name}"
            values={{ name: props.name }}
          />
        </AvatarFallbackText>
      </Avatar>
    </View>
  );
};

export default ProfileImageEdit;
