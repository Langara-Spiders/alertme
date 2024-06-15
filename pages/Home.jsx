import {
  Box,
  ButtonText,
  Center,
  Icon,
  Text,
} from "@gluestack-ui/themed";
import React, { useRef, useState } from 'react';

import Button from "../components/atoms/buttons/Button";
import { FormattedMessage } from 'react-intl'
import MainScreen from "../screens/home/MainScreen"
import {useToken} from "@gluestack-ui/themed";

const Home = ({ navigation }) => {

  const primaryColor =  useToken("colors")
  console.log("token:",primaryColor);


  return (

    <Box>
     
    
      <Box>
      <MainScreen navigation={navigation} />
      </Box>
    </Box>
  )
}

export default Home;
