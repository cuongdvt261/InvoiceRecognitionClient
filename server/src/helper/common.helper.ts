export class CommonHelper {
  static normalizePort(val: any) {
    const port = parseInt(val, 10);
    if (!isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return 0;
  }
}
