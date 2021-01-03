import { Connection, createConnection } from "typeorm";

export default class DbManager {
  private static instance: DbManager;
  public static getInstance(): DbManager {
    if (!DbManager.instance) {
      DbManager.instance = new DbManager();
    }
    return DbManager.instance;
  }

  private connections: { connection: Connection, time: Date }[] = [];

  public async getDb() {
    let connection = await this.createDbConnection();
    if (connection) {
      this.connections.push({ connection, time: new Date() });
    }
    this.cleanConnections();
    return connection;
  }

  private cleanConnections() {
    for (let index = 0; index < this.connections.length; index++) {
      const conn = this.connections[index];
      if (conn.connection.isConnected && (Math.floor((Number(new Date()) - Number(conn.time)) / 60000) < 2)) {
        conn.connection.close().then(() => { this.connections.splice(index, 1) }).catch((err) => console.log(err));
      } else if(conn.connection.isConnected === false) {
        this.connections.splice(index, 1);
      }
    }
  }

  private async createDbConnection(): Promise<null | Connection> {
    let connection: null | Connection = await new Promise((resolve, reject) => {
      createConnection({
        type: "postgres",
        host: "ec2-52-200-16-99.compute-1.amazonaws.com",
        port: 5432,
        username: "oabndaddywzscq",
        password: "4846588f073a9f897b90784507a601c9bf8ef5ebb30992d2efdf856f555d6719",
        database: "d6uichr6lna352",
        entities: [__dirname + '../Models/*.ts'],
        synchronize: true,
        logging: true,
        ssl: true,
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
      }).then(connection => {
        return resolve(connection);
      }).catch((error) => {
        console.log(error);
        return reject(null);
      });
    });

    return connection;
  }

}