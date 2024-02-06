import { DynamicModule } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { ConfigService } from '@dev/config';
import { createLoggerProviders } from './logger.providers';



export class LoggerModule {
  public static register(decoThis: any): DynamicModule {
    for(let key in decoThis){
      console.log(decoThis[key].toString())
    }
      
    return {
      module: LoggerModule,
      providers: [LoggerModule.customLoggerProvider(decoThis)],
      exports: [LoggerService],
    };
  }
  public static customLoggerProvider = (tag: any) => {
    const key = Object.keys(tag)[0]
    return {
      provide: LoggerService,
      useFactory: (ConfigService: ConfigService) => {
        const logger = new LoggerService(ConfigService)
        logger.setTag(key)
        return logger
      },
      inject: [ConfigService]
    }
  }
  static forRoot(): DynamicModule {
    const tadedLoggerProviders = createLoggerProviders();
    return {
      module: LoggerModule,
      providers: [LoggerService, ...tadedLoggerProviders],
      exports: [LoggerService, ...tadedLoggerProviders],
    };
  }
}
