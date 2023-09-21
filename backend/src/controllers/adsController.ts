import { Request, Response } from "express";
import { Ad } from "../entities/ad";

const adController = {
  read: async (_req: Request, res: Response) => {
    try {
      const result = await Ad.find();
      res.send(result);
    } catch (error) {
      res.send("An error occcured while reading the ad");
      console.error(error)
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      await Ad.save(req.body);
      res.send("Ad has been created")
    } catch (error) {
      res.send("An error occcured while creating the ad");
      console.error(error)
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const id = req.body.id; 
      await Ad.delete(id)
      res.send('Ad has been deleted')
    } catch (error) {
      res.send("An error occcured while deleting the ad");
      console.error(error)
    }
  },
  put: async (req: Request, res: Response) => {
    try {
      await Ad.update(req.body.id, req.body)
      res.send('Ad has been modified')
    } catch (error) {
      res.send("An error occcured while modifying the ad");
      console.error(error)
      
    }
  },
};

export default adController;