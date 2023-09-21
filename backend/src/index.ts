import express from 'express';
import sqlite3 from 'sqlite3';
import adsController from './controllers/adsController';
import categoryController from './controllers/categoryController';

const app = express();
export const db = new sqlite3.Database('good_corner.sqlite');

const port: number = 3000;

app.use(express.json());

db.run(`PRAGMA foreign_keys = ON;`);

db.run(`
  CREATE TABLE IF NOT EXISTS ad (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    title text,
    description text,
    owner text,
    price real,
    createdAt text,
    location text,
    picture text,
    category_id INTEGER NOT NULL,
    FOREIGN KEY(category_id) REFERENCES CATEGORY(ID)
  );
`);

db.run(`
  CREATE TABLE IF NOT EXISTS category (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    name text
  );
`);

app.get('/', (req, res) => {
  console.log(req);
  res.send('Hello World!')
});

app.get('/ad', adsController.read);
app.post('/ad', adsController.create);
app.delete('/ad', adsController.delete);
app.put('/ad', adsController.put);

app.get('/category', categoryController.read);
app.post('/category', categoryController.create);
app.delete('/category', categoryController.delete);
app.put('/category', categoryController.put);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});