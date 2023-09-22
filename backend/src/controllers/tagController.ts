import { Request, Response } from "express";
import { Tag } from "../entities/tag";


const categoryController = {
  read: async (_req: Request, res: Response) => {
    try {
      const result = await Tag.find({ 
        relations: {
          ads: true
        }
      });
      res.send(result);
    } catch (error) {
      res.send("An error occcured while reading tags");
      console.error(error)
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      await Tag.save(req.body);
      res.send("A Tag has been created")
    } catch (error) {
      res.send("An error occured while creating the Tag")
      console.error(error)
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      await Tag.delete(req.body.id);
      res.send('Tag has beend deleted')
    } catch (error) {
      res.send('An error occured while deleting the Tag');
      console.error(error);
    }
  },
  put: async (req: Request, res: Response) => {
    try {
      await Tag.update(req.body.id, req.body);
      res.send('Tag has been modified')
    } catch (error) {
      res.send('An error occured while modifying the Tag');
      console.error(error);
    }

  },
}

export default categoryController;