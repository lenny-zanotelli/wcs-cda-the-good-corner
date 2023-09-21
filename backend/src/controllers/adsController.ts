import { Request, Response } from "express";
import { db } from "../index";

const adController = {
  read: (req: Request, res: Response) => {
    db.all('SELECT * FROM ad', (_err: any, rows: any) => {
      res.send(rows);
    });
  },
  create: (req: Request, res: Response) => {
    db.run(
      `
      INSERT INTO ad (title, description, owner, price, location, createdAt, category_id)
      VALUES (
        "${req.body.title}",
        "${req.body.description}",
        "${req.body.owner}",
        ${req.body.price},
        "${req.body.location}",
        "${req.body.createdAt}",
        "${req.body.category_id}"
      );
      `,
      (err) => {
        if (err) {
          console.log("error", err);
          res.send("Error while adding the ad");
        } else {
          res.send("The ad has been added");
        }
      }
    );
  },
  delete: (req: Request, res: Response) => {
    db.run(
      `
      DELETE FROM ad WHERE id = ?;
      `,[req.body.id], () => {
        res.send(`Ad has been deleted`);
      });
  },
  put: (req: Request, res: Response) => {
    let data = [0, '20/10/2019']
  db.run(
    `
    UPDATE ad 
    SET price= ?
    WHERE createdAt= ?;
    `,
    [0, '20/10/2019'],
   (err) => {
    if(err) {
      console.error(err);
    }
    res.send(`Ad has been modify`);
  });
  },
};

export default adController;