import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { routes } from "../constants";
import { Login } from "../pages";
import { useStore } from "../store";
import StackNavigator from "./StackNavigator";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  // get id to check if user is logged in already
  const { getUser } = useStore();
  const { id } = getUser();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={id ? routes.MAIN : routes.LOGIN}>
        <Stack.Screen
          name={routes.MAIN}
          component={StackNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={routes.LOGIN}
          component={Login}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
