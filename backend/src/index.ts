import express from 'express';
import sqlite3 from 'sqlite3';
import { ads } from './data';

const app = express();
const db = new sqlite3.Database('good_corner.sqlite');

const port: number = 3000;

app.use(express.json());



app.get('/', (req, res) => {
  console.log(req);
  res.send('Hello World!')
});

app.get('/ad', (req, res) => {
  db.all('SELECT * FROM ad', (err, rows) => {
    res.send(rows);
  });
});

app.post('/ad', (req, res) => {
  console.log(req.body);
  db.run(
    `
    INSERT INTO ad (title, description, owner, price, location)
    VALUES (
      "${req.body.title}",
      "${req.body.description}",
      "${req.body.owner}",
      ${req.body.price},
      "${req.body.ville}"
    );
    `
    ,
    () => {
      res.send("The ad has been added");
    }
  )
});

app.delete('/ad', (req, res)=> {
  // // ca supprime par l'index, pas par l'id
  // ads.splice(req.body.id, 1);
  db.run(
    `
    DELETE FROM ad
    `, () => {
      res.send(`Ad has been deleted`);
    });
});

app.put('/ad', (req, res) => {
  let data = [0, '20/10/2019']
  db.run(
    `
    UPDATE ad 
    SET price= ?
    WHERE createdAt= ?;
    `,
    data,
   () => {
    res.send(`Ad has been modify`);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});