import { ButtonIcon, Input, InputField, InputIcon, InputSlot, SearchIcon } from '@gluestack-ui/themed';
import { Image, Text, View } from 'react-native';

import React from 'react';

const MainScreen = () => {
  return (
    <View style={{color:"white"}}>
      <View style={{display:"flex",flexDirection:"row", justifyContent:"center", alignItems:"center", gap:"1rem", width:"100%", position:"absolute"}}>
        
        <Input style={{flex:"1"}}>
            <InputSlot pl='$3'>
              <InputIcon as={SearchIcon}/>
            </InputSlot>
            <InputField
              placeholder="Search..."
            />
          </Input>
        <ButtonIcon as={SearchIcon} style={{borderRadius:"50%", border:"2px solid black", padding:".5rem"}}></ButtonIcon>
      </View>
        
      <View style={{ flex: 1 }}>
        <Image width="100%" height="50%"
        source={require('../../../assets/images/map.png')}
        style={{position:"relative"}}   
        />
      </View>
    
      <View style={{display:"flex", flexDirection:"row", alignItems:"center", position:"absolute",bottom:"11rem" ,width:"100%", justifyContent:"space-between"}}>
        <View style={{ alignItems:"center"}}>
          <ButtonIcon as={SearchIcon} style={{borderRadius:"50%", border:"2px solid black", padding:".5rem"}}></ButtonIcon>
          <Text size ="sm">Nearby Hazards</Text>
        </View>
        <View style={{alignItems:"center"}}>
          <ButtonIcon as={SearchIcon} style={{borderRadius:"50%", border:"2px solid black", padding:".5rem"}}></ButtonIcon>
          <Text size ="sm">Report Incidents</Text>
        </View>
      </View>
      
    </View>
  );
}

export default MainScreen;
