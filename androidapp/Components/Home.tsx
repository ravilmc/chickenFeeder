import { StyleSheet, View } from "react-native";
import { NavigationContext } from "@react-navigation/native";
import { useContext, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Input,
  Text,
} from "native-base";
import axios from "axios";
const Home = () => {
  const [ip, setIp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  function connect() {
    setIsLoading(true);
    axios
      .get(`http://${ip}:3000/status`)
      .then(() => {
        setError(null);
        setIsLoading(false);
        navigation!.navigate("Profile", { ip });
      })
      .catch(() => {
        setError("Invalid IP address");
        setIsLoading(false);
      });
  }

  const navigation = useContext(NavigationContext);
  return (
    <Box paddingX={5} marginTop={5}>
      <FormControl mb="5">
        <FormControl.Label>Enter IP From Device</FormControl.Label>
        <Input
          value={ip}
          onChange={(e) => {
            setIp(e.nativeEvent.text);
          }}
        />
        {error && (
          <Text marginTop={1} color={"error.500"}>
            {error}
          </Text>
        )}
      </FormControl>
      <Button isLoading={isLoading} onPress={(e) => connect()}>
        Connect
      </Button>
    </Box>
  );
};

export default Home;
