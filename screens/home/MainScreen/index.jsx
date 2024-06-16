import { ButtonIcon, Input, InputField, InputIcon, InputSlot, BellIcon, SearchIcon } from '@gluestack-ui/themed';
import { Image, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import Notifications from '../../notification/notifications';
import styles
  from './styles';
import React from 'react';
import { Button } from '@gluestack-ui/themed';
import { SvgUri } from 'react-native-svg';
import { Box } from '@gluestack-ui/themed';


const MainScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>

      <View style={styles.searchContainer}>
        <Input style={{ flex: 1 }}>
          <InputSlot pl='$3'>
            <InputIcon as={SearchIcon} />
          </InputSlot>
          <InputField placeholder="Search..." />
        </Input>
        <Button style={styles.button}>
          <ButtonIcon as={BellIcon} onPress={() => navigation.navigate('Notifications')} />
        </Button>
      </View>


      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button
          title="Report Incident"
          onPress={() => navigation.navigate('ReportIncident')}
        ><Text>Report Incident</Text></Button>
      </View>


    </View>
  );
};



export default MainScreen;
