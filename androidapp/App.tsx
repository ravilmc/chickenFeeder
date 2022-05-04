import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider, Box } from "native-base";

import { MyStack } from "./MyStack";
export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <MyStack />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
