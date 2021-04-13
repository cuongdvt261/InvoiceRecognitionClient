import winston, {createLogger} from 'winston';

import winstonConfig from '../config/winston.config';

export class Logger {
  private static instance: Logger;
  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private readonly logger: winston.Logger;

  constructor() {
    this.logger = createLogger(winstonConfig);
  }

  trace(msg: any, meta?: any) {
    this.logger.log('trace', msg, meta);
  }

  debug(msg: any, meta?: any) {
    this.logger.debug(msg, meta);
  }

  info(msg: any, meta?: any) {
    this.logger.info(msg, meta);
  }

  warn(msg: any, meta?: any) {
    this.logger.warn(msg, meta);
  }

  error(msg: any, meta?: any) {
    this.logger.error(msg, meta);
  }

  fatal(msg: any, meta?: any) {
    this.logger.log('fatal', msg, meta);
  }
}
