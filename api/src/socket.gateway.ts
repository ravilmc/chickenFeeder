import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import {AppService} from './app.service'


@WebSocketGateway({
    cors: {
        origin: '*',
    }
})
export class SocketGateway {
   constructor(
        private appService : AppService
    ){}

    @WebSocketServer()
    public server: Server

    handleConnection(client: Socket) {
        console.log(`client connected ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        console.log(`client disconnected ${client.id}`);
    }

    @SubscribeMessage('join-room')
    joinRoom(@MessageBody() roomId: string, @ConnectedSocket() client: Socket) {
        client.join(roomId)
        console.log(roomId);
    }

    @SubscribeMessage('temperature-changed')
    temperatureChanged(@MessageBody() temperature: number, @ConnectedSocket() client: Socket) {
       this.appService.setCurrTemp(temperature)
       const alldata = this.appService.alldata()
        const minimumTempr = alldata.minimumTemperature
         console.log(temperature < minimumTempr, typeof temperature , temperature , minimumTempr)
        if(temperature < minimumTempr || alldata.bulbManualOn){
            this.appService.setBulbStatus(true)
            this.server.to('relay').emit('bulb-on' , true)
        } else {
            console.log("off")
            this.appService.setBulbStatus(false)
            this.server.to('relay').emit('bulb-off' , true)
        }
    }

}
