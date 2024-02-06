import { Injectable, Scope } from '@nestjs/common';
import * as winston from 'winston';
import * as winstonConfig from './logger.winston';
import { LogLevel } from './logger.winston';
import { ConfigService } from '@dev/config';


export interface Loggable {
  constructor: Function;
  log?: LoggerService;
}



@Injectable({
  scope: Scope.TRANSIENT
})
export class LoggerService {
  public tag: string = 'app';
  public parent: LoggerService = null;
  constructor(public readonly config: ConfigService) { }

  private readonly logConf = {
    sys_logs: this.config._.log.sys_logs,
    daily_logs: this.config._.log.daily_logs,
    console_logs: this.config._.log.console_logs,
    http_logs: this.config._.log.http_logs,
  };

  private transports = () => {
    const transports = [];
    for (let key in this.logConf) {
      if (this.logConf[key]) {
        transports.push(winstonConfig[key](this.config));
      }
    }
    return transports;
  };
  /**
   * winston log singleton
   */
  protected static log_singleton: winston.Logger = null;
  protected log =
    LoggerService.log_singleton ||
    (LoggerService.log_singleton = winston.createLogger({
      exitOnError: false,
      handleExceptions: true,
      exceptionHandlers: winstonConfig.exceptionHandlers(this.config),
      transports: this.transports(),

    }));
  /**
   * @param level
   * @param this
   * @returns different level log function with coustumize label
   */
  protected logByLevel =
    (level: LogLevel, logger: LoggerService) =>
      (msg?: any, ...optionalParams: any[]): void => {
        let prefix = ``;
        // const appInstanceId = this.config.node_app_instance;
        // if (appInstanceId) {
        //     prefix = `${appInstanceId}][`;
        // }
        const labels = this.getFullTag();
        const newMsg = `[${prefix}${labels}] ${msg}`;
        // console.log(new Error().stack.split('\n'))
        // console.log(new Error())

        this.log[level](newMsg, ...optionalParams);
      };
  protected getFullTagArray = (): string[] => {
    const result: string[] = [];
    if (this.parent) {
      result.push(...this.parent.getFullTagArray());
    }
    result.push(this.tag);
    return result;
  };
  public getFullTag = (): string => {
    return this.getFullTagArray().join(`][`);
  };
  public setTag = (instanceOrStr: Loggable | string, parentInstance: Loggable = null): void => {
    this.tag = typeof instanceOrStr === 'string' ? instanceOrStr : instanceOrStr.constructor.name;
    this.parent = parentInstance?.log;
  };
  public d = this.logByLevel(LogLevel.debug, this);
  public v = this.logByLevel(LogLevel.verbose, this);
  public i = this.logByLevel(LogLevel.info, this);
  public w = this.logByLevel(LogLevel.warn, this);
  public e = this.logByLevel(LogLevel.error, this);
}
