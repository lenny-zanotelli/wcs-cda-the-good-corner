import { Request, Response } from "express";
import { Ad } from "../entities/ad";
import { Like } from "typeorm";
import { validate } from "class-validator";

const adsController = {
  read: async (req: Request, res: Response) => {
    let result: Ad[] = [];
    try {
      if(req.query.title) {
        result = await Ad.find({ 
          relations: {
            category: true,
            tags: true
          },
          where: {
            title: Like(`%${req.query.title}%`)
          }
        })
        console.log(req.query.title);
      } else {
        console.log('no title in query');
        result = await Ad.find({ 
          relations: {
            category: true,
            tags: true
          },
        });
      }
      res.send(result);
    } catch (error) {
      res.send("An error occcured while reading the ad");
      console.error(error)
    }
  },
  findOne: async (req: Request, res: Response) => {
    try {
      const result = await Ad.findOneByOrFail({
        id: parseInt(req.params.id)});
      res.send(result);
    } catch (error) {
      res.send("An error occcured while reading the one ad");
      console.error(error)
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const newAd = Ad.create(req.body);
      const errors = await validate(newAd);
      if (errors.length > 0) {
        throw new Error(`Validation failed`);
      } else {
        await newAd.save();
      }
      res.send("Ad has been created")
    } catch (error) {
      res.status(400).send("An error occcured while creating the ad");
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const id = req.body.id; 
      await Ad.delete(id);
      res.send('Ad has been deleted')
    } catch (error) {
      res.send("An error occcured while deleting the ad");
      console.error(error)
    }
  },
  put: async (req: Request, res: Response) => {
    try {
      const result = await Ad.find({
        where: {
          id: req.body.idToEdit,
        },
        relations: { category: true }
      });
      console.log('result', result);
      Ad.update({
         id: req.body.idToEdit }, 
         req.body.newAd);
      res.send('Ad has been updated')
    } catch (error) {
      res.send("An error occcured while modifying the ad");
      console.error(error)
    }
  },
};

export default adsController;