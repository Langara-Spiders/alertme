import { ButtonIcon, Input, InputField, InputIcon, InputSlot, BellIcon,SearchIcon } from '@gluestack-ui/themed';
import { Image, Text, View, SafeAreaView } from 'react-native';
import Notifications from '../../notification/notifications';

import React from 'react';

const MainScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: "1rem", width: "100%", position: "absolute" }}>
        <Input style={{ flex: "1" }}>
          <InputSlot pl='$3'>
            <InputIcon as={SearchIcon} />
          </InputSlot>
          <InputField placeholder="Search..." />
        </Input>
        <ButtonIcon as={BellIcon} onPress={() => navigation.navigate('Notifications')} />
      </View>
      
    </SafeAreaView>
  );
}

export default MainScreen;
