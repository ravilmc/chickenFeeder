import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Components/Home";
import Profile from "./Components/Profile";

const Stack = createStackNavigator();

export function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerMode: "screen",
        headerTintColor: "white",
        headerStyle: { backgroundColor: "tomato" },
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: "Chicken Feeder",
          animationEnabled: true,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Device Page",
        }}
      />
      <Stack.Screen
        name="Settings"
        component={Home}
        options={{
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
}
