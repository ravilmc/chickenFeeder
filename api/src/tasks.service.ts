import { Injectable  , Inject , forwardRef} from '@nestjs/common';
import * as fs from "fs";
import { Cron } from '@nestjs/schedule';
const path = require("path");
import { SocketGateway } from "./socket.gateway"
import { AppService } from "./app.service"
const DataFile = path.join(__dirname , "../data.json")

@Injectable()
export class TasksService {

     constructor(
     private socketClient : SocketGateway,
      private appService : AppService

     ){}


  @Cron('1 * * * * *')
  handleCron() {
    const data = JSON.parse(fs.readFileSync(DataFile , "utf-8"))
    const time = new Date()
    let on = false;
   data.motorOnTime.forEach(motorOnTime => {
      const min = time.getMinutes();
      const hour = time.getHours();
      
      if(hour == motorOnTime.hr && ( min >= motorOnTime.min && min < (motorOnTime.min + motorOnTime.minutes) )){
	on = true
	}
     })
     
     if (data.motorManulOn == true){
       on = true
     }
     if(on){
      this.socketClient.server.to('relay').emit('motor-on' , true)
       this.appService.setMotorStatus(true)
     }else {
       this.socketClient.server.to('relay').emit('motor-off' , true)
        this.appService.setMotorStatus(false)
     }
     
  }
  
    
  manualmotorToggle(){
        const data = JSON.parse(fs.readFileSync(DataFile , "utf-8"))
        if(data.motorManulOn){
             this.socketClient.server.to('relay').emit('motor-off' , true)
          }else {
               this.socketClient.server.to('relay').emit('motor-on' , true)
          }
          this.appService.setManualMotorStatus(!data.motorManulOn)
    
  }
  
 
  manualbulbToggle(){
       const data = JSON.parse(fs.readFileSync(DataFile , "utf-8"))
        if(data.bulbManualOn){
             this.socketClient.server.to('relay').emit('bulb-off' , true)
          }else {
               this.socketClient.server.to('relay').emit('bulb-on' , true)
          }
          this.appService.setManualBulbStatus(!data.bulbManualOn)
    
  }

}
