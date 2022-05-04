import axios from "axios";
import { Button, FormControl, Input, Modal } from "native-base";
import { useState } from "react";

export const MinimumTempModal: React.FC<{
  ip: string;
  minimumTemperature: number;
}> = ({ ip, minimumTemperature: prevTemp }) => {
  const [open, setOpen] = useState(false);
  const [minimumTemperature, setMinimumTemperature] =
    useState<number>(prevTemp);
  const openModal = () => {
    setOpen(true);
  };
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Button onPress={openModal}>Change</Button>
      <Modal isOpen={open} onClose={() => setOpen(false)} safeAreaTop={true}>
        <Modal.Content maxWidth="350">
          <Modal.CloseButton />
          <Modal.Header>Change Min Tempr.</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Temperature</FormControl.Label>
              <Input
                value={minimumTemperature.toString()}
                onChange={(e) => {
                  setMinimumTemperature(
                    isNaN(parseInt(e.nativeEvent.text))
                      ? 0
                      : parseInt(e.nativeEvent.text)
                  );
                }}
                keyboardType="numeric"
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onPress={() => {
                  setLoading(true);
                  axios
                    .post(`http://${ip}:3000/minimumTemperature`, {
                      temperature: +minimumTemperature,
                    })
                    .then((res) => {
                      setLoading(false);
                      setOpen(false);
                    });
                }}
              >
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default MinimumTempModal;
