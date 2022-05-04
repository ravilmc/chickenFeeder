import socketio
import sys
import Adafruit_DHT
import time
# standard Python
sio = socketio.Client() 

@sio.event
def connect():
    print("I'm connected!")

sio.connect('http://127.0.0.1:3000')

sio.emit('join-room' , 'dataapp')



while True:
    humidity, temperature = Adafruit_DHT.read_retry(11, 4)
    print( 'Temp: {0:0.1f} C  Humidity: {1:0.1f} %'.format(temperature, humidity))
    sio.emit('temperature-changed' , temperature)
    time.sleep(5)
