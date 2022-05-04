import axios from "axios";
import {
  Box,
  Button,
  DeleteIcon,
  Divider,
  FlatList,
  Flex,
  FormControl,
  HStack,
  IconButton,
  Input,
  Switch,
  Text,
} from "native-base";
import { MaterialIcons } from "@native-base/icons";
import { useEffect, useState } from "react";
import { View } from "react-native";
import MinimumTempModal from "./MinimumTempModal";
import AddMotorOnTime from "./AddMotorOnTime";

const Profile: React.FC<{
  route: {
    params: {
      ip: string;
    };
  };
}> = ({ route }) => {
  const [allData, setAllData] = useState<ALLDATA | null>(null);
  const [currentTemperature, setCurrentTemperature] = useState<number>(0);

  const ip = route.params.ip;

  function loadData() {
    axios
      .get<ALLDATA>(`http://${ip}:3000/alldata`)
      .then((res) => setAllData(res.data));
  }

  useEffect(() => {
    setInterval(() => {
      loadData();
      axios
        .get<number>(`http://${ip}:3000/currentTemperature`)
        .then((res) => setCurrentTemperature(res.data));
    }, 1000);
  }, [ip]);

  if (!allData) return <Box>Loading</Box>;

  return (
    <Box paddingX={3} marginY={2}>
      <Text fontSize={16}> Current Temperature : {currentTemperature}</Text>
      <Text fontSize={16}> MotorStatus : {allData.motorOn ? "On" : "Off"}</Text>
      <Text fontSize={16}> BulbStatus : {allData.bulbOn ? "On" : "Off"}</Text>
      <Divider marginY={3} />
      <Flex
        direction="row"
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Text fontSize={16}>
          Minimum Temperatue : {allData.minimumTemperature}
        </Text>
        <MinimumTempModal
          ip={ip}
          minimumTemperature={allData.minimumTemperature}
        />
      </Flex>
      <Divider marginY={3} />

      <Flex
        direction="row"
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Text fontSize={16}>Motor On Time</Text>
        <AddMotorOnTime ip={ip} />
      </Flex>

      <FlatList
        data={allData.motorOnTime}
        renderItem={({ item }) => (
          <>
            <Flex
              direction="row"
              alignItems={"center"}
              justifyContent={"space-between"}
              marginY={2}
              paddingY={2}
            >
              <Text fontSize={18}>
                {item.hr} : {item.min} for {item.minutes} minutes
              </Text>
              <Button
                onPress={() => {
                  console.log(item.id);
                  axios.post(`http://${ip}:3000/removeMotorOnTime`, {
                    id: item.id,
                  });
                }}
                colorScheme="red"
                size={"md"}
              >
                ---
              </Button>
            </Flex>
            <Divider />
          </>
        )}
      ></FlatList>
      <Divider marginY={3} />
      <Text fontSize={18}>Manual Modes : </Text>
      <HStack alignItems="center" space={4}>
        <Text fontSize={16}>Bulb</Text>
        <Switch
          size={"md"}
          isChecked={allData.bulbManualOn}
          onChange={(e) => {
            axios.get(`http://${ip}:3000/manualbulbtoggle`).then((res) => {});
          }}
        />
        <Text fontSize={16}>Motor</Text>
        <Switch
          size={"md"}
          isChecked={allData.motorManulOn}
          onChange={(e) => {
            axios.get(`http://${ip}:3000/manualmotortoggle`).then((res) => {});
          }}
        />
      </HStack>
    </Box>
  );
};

export default Profile;

const sampleAllData = {
  bulbOn: false,
  motorOn: false,
  minimumTemperature: 40,
  motorManulOn: false,
  bulbManualOn: false,
  motorOnTime: [
    {
      id: 1,
      hr: 7,
      min: 42,
      minutes: 2,
    },
    {
      id: 2,
      hr: 5,
      min: 30,
      minutes: 4,
    },
  ],
};

type ALLDATA = typeof sampleAllData;
