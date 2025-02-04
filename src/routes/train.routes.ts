import express, { type NextFunction, type Response, type Request } from "express";
import { AppDataSource, sqlQuery } from "../databases/sql-db";
import { type Repository } from "typeorm";
import { Train } from "../models/Train";
import { Travel } from "../models/Travel";


const trainRepository: Repository<Train> = AppDataSource.getRepository(Train);
const travelRepository: Repository<Travel> = AppDataSource.getRepository(Travel);

export const trainRouter = express.Router();


// CRUD: READ
trainRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const trains: Train[] = await trainRepository.find({ relations: ["travels"] });
      res.json(trains);
    } catch (error) {
      next(error);
    }
  });
  
  trainRouter.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const idReceivedInParams = parseInt(req.params.id);
  
      const train = await trainRepository.findOne({
        where: {
          id: idReceivedInParams,
        },
        relations: ["travels"],
      });
  
      if (!train) {
        res.status(404).json({ error: "Train not found" });
      }
  
      res.json(train);
    } catch (error) {
      next(error);
    }
  });
  
  // CRUD: CREATE
  trainRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Construimos train
      const newTrain = new Train();
  
      let travelOfTrain;
  
      if (req.body.travelId) {
        travelOfTrain = await travelRepository.findOne({
          where: {
            id: req.body.travelId,
          },
        });
  
        if (!travelOfTrain) {
          res.status(404).json({ error: "Travel not found" });
          return;
        }
      }
  
      // Asignamos valores
      Object.assign(newTrain, {
        ...req.body,
        travel: travelOfTrain,
      });
  
      const trainSaved = await trainRepository.save(newTrain);
  
      res.status(201).json(trainSaved);
    } catch (error) {
      next(error);
    }
  });
  
  // CRUD: DELETE
  trainRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const idReceivedInParams = parseInt(req.params.id);
  
      const trainToRemove = await trainRepository.findOneBy({
        id: idReceivedInParams,
      });
  
      if (!trainToRemove) {
        res.status(404).json({ error: "Train not found" });
      } else {
        await trainRepository.remove(trainToRemove);
        res.json(trainToRemove);
      }
    } catch (error) {
      next(error);
    }
  });
  
  trainRouter.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const idReceivedInParams = parseInt(req.params.id);
  
      const trainToUpdate = await trainRepository.findOneBy({
        id: idReceivedInParams,
      });
  
      if (!trainToUpdate) {
        res.status(404).json({ error: "Train not found" });
      } else {
        let travelOfTrain;
  
        if (req.body.travelId) {
          travelOfTrain = await travelRepository.findOne({
            where: {
              id: req.body.travelId,
            },
          });
  
          if (!travelOfTrain) {
            res.status(404).json({ error: "Travel not found" });
            return;
          }
        }
  
        // Asignamos valores
        Object.assign(trainToUpdate, {
          ...req.body,
          travel: travelOfTrain,
        });
  
        const updatedTrain = await trainRepository.save(trainToUpdate);
        res.json(updatedTrain);
      }
    } catch (error) {
      next(error);
    }
  });
  