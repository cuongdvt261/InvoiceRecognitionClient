import {Db, MongoClient} from 'mongodb';

import {Logger} from '../lib/logger.lib';

export class MongoDb {
  private client: MongoClient | undefined;
  private readonly connectionString = process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017';
  private readonly dbName = process.env.DB_NAME || 'InvoiceRecognition';

  public close() {
    if (this.client) {
      this.client.close()
        .then()
        .catch((err) => {
          Logger.getInstance().error(err);
        });
    } else {
      Logger.getInstance().error('close: client is undefined');
    }
  }

  public async connect() {
    try {
      if (!this.client) {
        this.client = await MongoClient.connect(this.connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
      }
    } catch (err) {
      Logger.getInstance().error(err);
    }
  }

  public getDb(): Db | undefined {
    if (this.client) {
      return this.client.db(this.dbName);
    } else {
      Logger.getInstance().error('no db found');
      return undefined;
    }
  }
}
