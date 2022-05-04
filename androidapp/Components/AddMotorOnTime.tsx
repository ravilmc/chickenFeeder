import axios from "axios";
import { Button, FormControl, Input, Modal } from "native-base";
import React, { useState } from "react";

const AddMotorOnTime: React.FC<{
  ip: string;
}> = ({ ip }) => {
  const [open, setOpen] = useState(false);
  const [hr, setHr] = useState<number>(0);
  const [min, setmin] = useState<number>(0);
  const [minutes, setminutes] = useState<number>(1);

  const openModal = () => {
    setOpen(true);
  };
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Button onPress={openModal}>Add</Button>
      <Modal isOpen={open} onClose={() => setOpen(false)} safeAreaTop={true}>
        <Modal.Content maxWidth="350">
          <Modal.CloseButton />
          <Modal.Header>Change Motor Run Time</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Hour</FormControl.Label>
              <Input
                value={hr.toString()}
                onChange={(e) => {
                  setHr(
                    (isNaN(parseInt(e.nativeEvent.text))
                      ? 0
                      : parseInt(e.nativeEvent.text)) % 24
                  );
                }}
                keyboardType="numeric"
              />
            </FormControl>

            <FormControl>
              <FormControl.Label>Minute</FormControl.Label>
              <Input
                value={min.toString()}
                onChange={(e) => {
                  setmin(
                    (isNaN(parseInt(e.nativeEvent.text))
                      ? 0
                      : parseInt(e.nativeEvent.text)) % 60
                  );
                }}
                keyboardType="numeric"
              />
            </FormControl>

            <FormControl>
              <FormControl.Label>Running Minute</FormControl.Label>
              <Input
                value={minutes.toString()}
                onChange={(e) => {
                  setminutes(
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
                    .post(`http://${ip}:3000/motorOnTime`, {
                      hr,
                      min,
                      minutes,
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

export default AddMotorOnTime;
