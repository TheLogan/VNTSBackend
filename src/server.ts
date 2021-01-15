import express from 'express'
import bodyParser from "body-parser";
import projectRouter from './Routes/projectRouter';
import "reflect-metadata";
import { createConnection } from "typeorm";
import { dbConf } from './Utils/cfg';

if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  require('dotenv').config();
}
var cors = require('cors')

async function startServer() {
  const app = express();
  app.use(cors())
  app.use(bodyParser.json());

  const port = process.env.PORT || 3000;
  await new Promise((res, rej) => {
    let path = __dirname + "/Models/*.ts";
    let connStr = dbConf();

    createConnection({
      type: "postgres",
      host: connStr.host,
      port: connStr.port,
      username: connStr.username,
      password: connStr.password,
      database: connStr.database,
      entities: [path],
      synchronize: true,
      logging: true,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }).then(connection => {
      res(null);
    }).catch(error => console.log(error));
  });

  app.use('/projects', projectRouter);

  app.listen(port, () => {
    console.log('listening on port: ', port);
  })
}

startServer();