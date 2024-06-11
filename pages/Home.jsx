import {
  Box,
  Icon,
  Text,
  Center,
  ButtonText,
} from "@gluestack-ui/themed";
import {useToken} from "@gluestack-ui/themed";
import Button from "../components/atoms/buttons/Button";
import { FormattedMessage } from 'react-intl'
import React, { useRef, useState } from 'react';


const Home = () => {

  const primaryColor =  useToken("colors")
  console.log("token:",primaryColor);


  return (

    <Box
      // bg="$primary"
      justifyContent="center"
      alignItems="center"
      flex={1}>
      <Box>
        <Text size="5xl" color="$green900" textAlign="right" fontFamily="$body">
          <FormattedMessage id="home.title" defaultMessage="Hi from Home" />
        </Text>
        <Button>
          <FormattedMessage id="home.button" defaultMessage="Press" />
        </Button>
      </Box>
    </Box>
  )
}

export default Home;
