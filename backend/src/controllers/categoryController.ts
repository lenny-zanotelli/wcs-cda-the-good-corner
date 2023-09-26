import { Request, Response } from "express";
import { Category } from "../entities/category";


const tagController = {
  read: async (_req: Request, res: Response) => {
    try {
      const result = await Category.find();
      res.send(result);
    } catch (error) {
      res.send("An error occcured while reading categories");
      console.error(error)
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      await Category.save(req.body);
      res.send("A Category has been created")
    } catch (error) {
      res.send("An error occured while creating the category")
      console.error(error)
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      await Category.delete(req.body.id);
      res.send('Category has beend deleted')
    } catch (error) {
      res.send('An error occured while deleting the category');
      console.error(error);
    }
  },
  put: async (req: Request, res: Response) => {
    try {
      await Category.update(req.body.id, req.body);
      res.send('Category has been modified')
    } catch (error) {
      res.send('An error occured while modifying the category');
      console.error(error);
    }

  },
}

export default tagController;