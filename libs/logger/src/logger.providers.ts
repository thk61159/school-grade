import { Provider } from '@nestjs/common';
import { tagsForLoggers } from './logger.decorator';
import { LoggerService } from './logger.service';

function loggerFactory(logger: LoggerService, tag: string) {
  if (tag) {
    const [mainTag, parentTag] = tag.split('|')
    logger.setTag(mainTag, parentTag);
  }
  return logger;
}

function createLoggerProvider(tag: string): Provider<LoggerService> {
  return {
    provide: `Logger${tag}`,
    useFactory: (logger) => loggerFactory(logger, tag),
    inject: [LoggerService],
  };
}

export function createLoggerProviders(): Array<Provider<LoggerService>> {
  return tagsForLoggers.map((tag) => createLoggerProvider(tag));
}