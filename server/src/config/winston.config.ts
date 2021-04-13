import {format, transports} from 'winston';
import moment from 'moment';
import * as app_root from 'app-root-path';

import config from './app.config';
import 'winston-daily-rotate-file';

const winstonConfig = {
  format: format.printf((info) => {
    let msg = `${moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')} - ${info.level.toUpperCase()}: ${info.message} `;
    msg = info.obj ? `${msg}data:${JSON.stringify(info.obj)} | ` : msg;
    return msg;
  }),
  transports: [
    new transports.Console({
      level: config.log.consoleLevel,
      format: format.combine(
                format.colorize(),
                format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
                format.printf((log) => `${log.level}\t${log.timestamp}\t${log.message}`),
            ),
    }),
    new transports.DailyRotateFile({
      level: config.log.fileLevel,
      filename: `${app_root}/logs/KyodoServer-%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '5m',
      maxFiles: '30d',
    }),
    new transports.File({
      level: 'error',
      filename: `${app_root}/logs/error/error.log`,
    }),
  ],
};

export default winstonConfig;
