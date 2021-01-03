import express from 'express'
import projectRouter from './Routes/projectRouter';
import "reflect-metadata";
import { createConnection } from "typeorm";
import { Project } from "./Models/Project";
import { Image } from './Models/Image';


async function startServer() {
  const app = express()
  const port = process.env.PORT || 3000;

  await new Promise((res, rej) => {
    let path = __dirname + "/Models/*.ts";
    createConnection({
      type: "postgres",
      host: "ec2-52-200-16-99.compute-1.amazonaws.com",
      port: 5432,
      username: "oabndaddywzscq",
      password: "4846588f073a9f897b90784507a601c9bf8ef5ebb30992d2efdf856f555d6719",
      database: "d6uichr6lna352",
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