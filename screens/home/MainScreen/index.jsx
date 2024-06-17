import { ButtonIcon, Input, InputField, InputIcon, InputSlot, BellIcon, SearchIcon } from '@gluestack-ui/themed';
import { Image, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import Notifications from '../../notification/notifications';
import styles
  from './styles';
import React from 'react';
import { Button } from '@gluestack-ui/themed';
import BottomSheet from '../../../components/molecules/modals/BottomSheet';


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
        <View style={{marginBottom: 60 , marginTop: 200}}>
        <Button
          title="Report Incident"
          onPress={() => navigation.navigate('ReportIncident')}
        ><Text>Report Incident</Text></Button>
        </View>
        <View style={{marginBottom: 60}}>
        <Button
          title="Nearby Hazards"><Text>NearBy Hazards</Text></Button>
        </View>
      </View>
    
      <BottomSheet />
     

    
    </View>
  );
};



export default MainScreen;
