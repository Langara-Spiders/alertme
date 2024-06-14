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

const Home = () => {

  const primaryColor =  useToken("colors")
  console.log("token:",primaryColor);


  return (

    <Box>
     {/*  // bg="$primary"
      // justifyContent="center"
      // alignItems="center"
      // flex={1} */}
      <Box>
       {/*  <Text size="5xl" color="$green900" textAlign="right" fontFamily="$body">
          <FormattedMessage id="home.title" defaultMessage="Hi from Home" />
        </Text> */}
        <MainScreen></MainScreen>
        {/* <Button>
          <FormattedMessage id="home.button" defaultMessage="Press" />
        </Button> */}
      </Box>
    </Box>
  )
}

export default Home;
