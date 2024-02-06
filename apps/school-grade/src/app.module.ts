import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule, LoggerService, Tag } from '@dev/logger';
import { ConfigModule, ConfigService } from '@dev/config';


@Module({
  imports: [
    ConfigModule.register({}),
    LoggerModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private config: ConfigService) {
    // this.config.setConfig('1.1.1.11', 'log', 'syslog_ip')
  }
}
