'use strict';

import { CommonHelper } from '../helper/common.helper';

const defaults = {
  server: {
    port: 3000,
  },
};

const appConfig = {
  log: {
    consoleLevel: process.env.LOG_CONSOLE_LEVEL || 'debug',
    fileLevel: process.env.LOG_FILE_LEVEL || 'debug',
  },
  server: {
    port: CommonHelper.normalizePort(process.env.SERVER_PORT || defaults.server.port),
  },
  upload_dir: process.env.HOME_DIR || 'uploads/',
  download_dir: process.env.HOME_DIR || 'downloads/',
  ws_url: 'ws://127.0.0.1:9999',
  privateKey: 'FsgvPuR2lr'
};

export default appConfig;
