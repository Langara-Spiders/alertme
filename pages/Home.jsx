import {
  Box,
  Text
} from "@gluestack-ui/themed";
import Button from "../components/atoms/Button";

const Home = () => {
  return (
    <Box
      justifyContent="center"
      alignItems="center"
      flex={1}>
      <Box>
        <Text>Hi from Home Screen!</Text>
        <Button> Press </Button>
      </Box>
    </Box>
  )
}

export default Home;
