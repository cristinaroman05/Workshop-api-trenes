import { AppDataSource, sqlConnect } from "../src/databases/sql-db";

import {
    type Request,
    type Response,
  } from "express";

import express from "express";
import cors from "cors";
import { trainRouter } from "../src/routes/train.routes";
import { bookingRouter } from "../src/routes/booking.routes";
import { userRouter } from "../src/routes/user.routes";
import { travelRouter } from "../src/routes/travel.routes";


const main = async (): Promise<void> => {
  // Conexión a la BBDD
  const dataSource = await AppDataSource.initialize()

  const sqlDatabase = await sqlConnect();

  // Configuración del server
  const PORT = 3000;
  const app = express();
  
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(
    cors({
      origin: "http://localhost:3000",
    })
  );
  // Rutas
  const router = express.Router();
  
  router.get("/", (req: Request, res: Response) => {
    res.send(`
        <h3>Esta es la RAIZ de nuestra API.</h3>
        <p>Estamos usando la BBDD TypeORM ${
          dataSource.options.database as string
        } del host ${sqlDatabase?.config?.host as string}</p>
      `);
  });
  router.get("*", (req: Request, res: Response) => {
    res
      .status(404)
      .send("Lo sentimos :( No hemos encontrado la página solicitada.");
  });

  
  app.use("/train", trainRouter)
  app.use("/booking", bookingRouter)
  app.use("/user", userRouter)
  app.use("/travel", travelRouter)
  app.use("/", router);

  app.listen(PORT, () => {
    console.log(`Server levantado en el puerto ${PORT}`);
  });
};

void main ();