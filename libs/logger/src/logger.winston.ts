import * as winston from 'winston';
import * as util from 'util';
import 'winston-daily-rotate-file'; // Sometimes showing memory leak
import { Syslog } from 'winston-syslog';
import { ConfigService } from '@dev/config';


const { createLogger, format } = winston;
const { combine, timestamp, label } = format;

export enum LogLevel {
  verbose = 'verbose',
  debug = 'debug',
  info = 'info',
  warn = 'warn',
  error = 'error',
}
/**
 * Possible options are below.
 * Font styles: bold, dim, italic, underline, inverse, hidden, strikethrough.
 * Font foreground colors: black, red, green, yellow, blue, magenta, cyan, white, gray, grey.
 * Background colors: blackBG, redBG, greenBG, yellowBG, blueBG magentaBG, cyanBG, whiteBG
 */
export const myCustomLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    verbose: 4,
    debug: 5,
  },
  colors: {
    error: 'inverse red',
    warn: 'bold yellow',
    info: 'blueBG',
    verbose: 'green',
    debug: 'white',
  },
};
/**>
 * @param
 * @returns winston transport setting
 */
export const sys_logs = (config: ConfigService) =>
  new Syslog({
    levels: myCustomLevels,
    level: LogLevel.info,
    handleExceptions: true,
    handleRejections: true,

    host: config._.log.syslog_ip,
    port: config._.log.syslog_port,
    protocol: config._.log.syslog_protocol,
    format: debugFormat,
  });
export const daily_logs = (config: ConfigService) =>
  new winston.transports.DailyRotateFile({
    level: config._.node_env === 'production' ? LogLevel.verbose : LogLevel.debug,
    datePattern: 'YYYY-MM-DD',
    filename: '%DATE%_Server.log',
    dirname: config._.log.path,
    handleExceptions: true,
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: loggingFormat,
  });
export const console_logs = (config: ConfigService) =>
  new winston.transports.Console({
    level: config._.node_env === 'production' ? LogLevel.verbose : LogLevel.debug,
    format: debugFormat,
    handleExceptions: true,
    handleRejections: true,
  });
export const http_logs = (config: ConfigService) =>
  new winston.transports.Http({
    level: config._.node_env === 'production' ? LogLevel.verbose : LogLevel.debug,
    handleExceptions: true,
    handleRejections: true,

    format: debugFormat,

    host: config._.log.httplog_ip,
    port: config._.log.httplog_port,
    path: '/logs',
  });
export const exceptionHandlers = (config: ConfigService) => config._.log.daily_logs ?
  [new winston.transports.File({
    handleExceptions: true,
    dirname: config._.log.path,
    filename: 'exception.log',
  })] : []


/**
 * @param hasColorize
 * @param hasTimestamp
 * @returns formatOptions in array
 */
export const formater = (hasColorize: boolean = false, hasTimestamp: boolean = false) => {
  const formatOptions = [
    hasColorize && winston.format.colorize({ all: true, ...myCustomLevels }),
    hasTimestamp && winston.format.timestamp(),
    winston.format.printf((info) => {
      const { level, message, timestamp, ...rest } = info;
      const splat = rest[Object.getOwnPropertySymbols(rest).find(symbol => symbol.toString() === 'Symbol(splat)')];
      const restString = splat ? util.inspect(splat, { depth: null }) : '';
      if (restString) {
        const indentedRestString = restString.split('\n').map(line => `${''.padStart(32)} ${line}`).join('\n')
        return `${timestamp || ''} ${level} - ${message} \n${indentedRestString}`;
      }
      return `${timestamp || ''} ${level} - ${message}`;

    }),
  ];
  return winston.format.combine(...formatOptions.filter(Boolean));
};
const loggingFormat = formater(false, true);
const debugFormat = formater(true, true);