import { Request, Response } from "express";
import { db } from "../index";


const categoryController = {
  read: (req: Request, res: Response) => {
    db.all('SELECT * FROM category', (_err: any, rows: any) => {
      res.send(rows);
    });
  },
  create: (req: Request, res: Response) => {
    db.run(
      `
      INSERT INTO category (name)
      VALUES(
        "${req.body.name}"
      )
      `,
      (err) => {
        if (err) {
          console.log("error", err);
          res.send("Error while adding the category");
        } else {
          res.send("The category has been added");
        }
      }
    )
  },
  delete: (req: Request, res: Response) => {
    db.run(
      `
      DELETE FROM category WHERE id = ?;
      `,[req.body.id], 
      (err) => {
        if (err) {
          console.log("error", err);
          res.send("Error while deleting the category");
        } else {
          res.send("The category has been deleted");
        }
      }
    );
  },
  put: (req: Request, res: Response) => {
  db.run(
    `
    UPDATE category
    SET name= ?
    WHERE id= ?;
    `,
    [req.body.name, req.body.idToEdit],
   (err) => {
    if (err) {
      console.log("error", err);
      res.send("Error while modifying the category");
    } else {
      res.send("The category has been modified");
    }
  });
  },
}

export default categoryController;