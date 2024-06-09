import {
  Box,
  Text
} from "@gluestack-ui/themed";
import Button from "../components/atoms/Button";
import { FormattedMessage } from 'react-intl'

const Home = () => {
  return (
    <Box
      justifyContent="center"
      alignItems="center"
      flex={1}>
      <Box>
        <Text>
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
