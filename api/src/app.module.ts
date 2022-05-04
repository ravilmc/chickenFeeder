import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksService } from './tasks.service';
import { ScheduleModule } from '@nestjs/schedule';
import { SocketGateway } from "./socket.gateway"
@Module({
  imports: [
  ScheduleModule.forRoot()
  ],
  controllers: [AppController],
  providers: [SocketGateway ,AppService,TasksService ],
  exports : [AppService]
 
})
export class AppModule { }
