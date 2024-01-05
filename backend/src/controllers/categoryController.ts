import { Request, Response } from "express";
import { Category } from "../entities/category.entity";
import { validate } from "class-validator";


const categoryController = {
  read: async (req: Request, res: Response) => {
    let result: Category[] = [];
    try {
      if(req.query.name) {
        result = await Category.find({
          relations: {
            ads: true,
          },
          where: {
            name: `${req.query.name}`
          }
        });
        console.log(req.query.name);
      } else {
        console.log('no category in query')
        result = await Category.find({
          relations: {
            ads: true
          },
        });
      }
      res.send(result);
    } catch (error) {
      res.send("An error occcured while reading categories");
      console.error(error)
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const newCategory = Category.create(req.body);
      const errors = await validate(newCategory);
      if (errors.length > 0) {
        throw new Error(`Validation failed`);
      } else {
        await newCategory.save();
      }
      res.send("A Category has been created")
    } catch (error) {
      res.status(400).send("An error occured while creating the category")
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
      res.send('An error occured while updating the category');
      console.error(error);
    }

  },
}

export default categoryController;