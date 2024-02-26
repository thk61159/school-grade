import { Module } from '@nestjs/common';
import { LoggerModule, LoggerService, Tag } from '@dev/logger';
import { ConfigModule, ConfigService } from '@dev/config';
import { DbModule } from '@dev/db';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseModule } from '../../course/src/course.module';
import {Course, Selection} from '../../course/db'
import { Grade } from '../../grade/db';
import { User } from '../../user/db';


@Module({
  imports: [
    ConfigModule.register({}),
    LoggerModule.forRoot(), 
    DbModule.forRoot({
      entities:[
        Course, Selection, Grade, User
    ]}),
    CourseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private config: ConfigService) {
    // console.log(config._)
    // this.config.setConfig('1.1.1.11', 'log', 'syslog_ip')
  }
}
