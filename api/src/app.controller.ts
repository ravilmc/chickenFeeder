import { Controller, Get , Post , Body} from '@nestjs/common';
import { AppService } from './app.service';
import { TasksService } from './tasks.service';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly taskService : TasksService
  ) { }

  @Get('status')
  getHello(): boolean {
    return true;
  }
  
  @Get('currentTemperature')
  getCurrentTempr() {
    return this.appService.getCurrTemp()
  }
  
  @Post('minimumTemperature')
  setMinimumTemperature(
    @Body() data : {temperature : number}
  ){
    return this.appService.setminimumTemperature(+data.temperature)
  }
  
  @Post('motorOnTime')
  setMotorOnTime(@Body() data){
    return this.appService.setMotorOnTime(data)
  }
  
  @Post('removeMotorOnTime')
  removeMotorOnTime(@Body() data){
    return this.appService.removeMotorOnTime(+data.id)
  }
  
  @Get('alldata')
  alldata(){
    return this.appService.alldata()
  }
   
  @Get('manualmotortoggle')
  manualmotorToggle(){
    return this.taskService.manualmotorToggle()
  }
  
  @Get('manualbulbtoggle')
  manualbulbToggle(){
    return this.taskService.manualbulbToggle()
  }
}
