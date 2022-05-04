import { Injectable  , Inject , forwardRef} from '@nestjs/common';
import * as fs from "fs";
import { Cron } from '@nestjs/schedule';
const path = require("path");
import { SocketGateway } from "./socket.gateway"
const DataFile = path.join(__dirname , "../data.json")


@Injectable()
export class AppService {
  
  private currTemp = 0;


getminimumTemperature() {
  const data = JSON.parse(fs.readFileSync(DataFile , "utf-8"))
  console.log(data.minimumTemperature)
  return data.minimumTemperature
}

setminimumTemperature(tempr) {
  const data = JSON.parse(fs.readFileSync(DataFile , "utf-8"))
  data.minimumTemperature = tempr
  fs.writeFileSync(DataFile , JSON.stringify(data,null,2))
  return tempr
}

setBulbStatus(status) {
   const data = JSON.parse(fs.readFileSync(DataFile , "utf-8"))
   data.bulbOn = status
   fs.writeFileSync(DataFile , JSON.stringify(data,null,2))
   return true
}

getMotorStatus() {
	return false;
}

setMotorStatus(status) {
     const data = JSON.parse(fs.readFileSync(DataFile , "utf-8"))
   data.motorOn = status
   fs.writeFileSync(DataFile , JSON.stringify(data,null,2))
   return true
}

setManualMotorStatus(status) {
   const data = JSON.parse(fs.readFileSync(DataFile , "utf-8"))
   data.motorManulOn = status
   data.motorOn = status
   fs.writeFileSync(DataFile , JSON.stringify(data,null,2))
   return true
}

setManualBulbStatus(status) {
   const data = JSON.parse(fs.readFileSync(DataFile , "utf-8"))
   data.bulbManualOn = status
   data.bulbOn = status
   fs.writeFileSync(DataFile , JSON.stringify(data,null,2))
   return true
}

getCurrTemp() {
  return this.currTemp
}

setCurrTemp(temp) {
  this.currTemp = temp
  return true
}

setMotorOnTime(data) {
  const savedData = JSON.parse(fs.readFileSync(DataFile , "utf-8"))
  const highestId = savedData.motorOnTime.reduce((acc, curr) => curr.id > acc ? curr.id : acc , 0)
  savedData.motorOnTime = [ ...savedData.motorOnTime , {
       hr : +data.hr,
      min: +data.min,
      minutes : +data.minutes,
      id : highestId+1
    }]
    fs.writeFileSync(DataFile , JSON.stringify(savedData,null,2))
    return true
    
  }
 removeMotorOnTime(id){
     const savedData = JSON.parse(fs.readFileSync(DataFile , "utf-8"))
    savedData.motorOnTime =  savedData.motorOnTime.filter(mt => mt.id != id)
      fs.writeFileSync(DataFile , JSON.stringify(savedData,null,2))
      return true
   }
  alldata(){
    return JSON.parse(fs.readFileSync(DataFile , "utf-8"))
  }
  

}
