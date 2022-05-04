import RPi.GPIO as GPIO
import socketio
import time


in1 = 16
in2 = 18


GPIO.setmode(GPIO.BOARD)
GPIO.setup(in1, GPIO.OUT)
GPIO.setup(in2, GPIO.OUT)

GPIO.output(in1, False)
GPIO.output(in2, False)

sio = socketio.Client()

@sio.event
def connect():
    print("I'm connected!")

@sio.on('bulb-on')
def on_message(data):
    GPIO.output(in1, True)

@sio.on('bulb-off')
def on_message(data):
    GPIO.output(in1, False)

@sio.on('motor-on')
def on_message(data):
    GPIO.output(in2, True)

@sio.on('motor-off')
def on_message(data):
    GPIO.output(in2, False)

sio.connect('http://127.0.0.1:3000')
sio.emit('join-room' , 'relay')

