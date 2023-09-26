import "reflect-metadata";
import express, { Express } from 'express';
import cors from 'cors';
import dataSource from "../config/db";
import adsController from "./controllers/adsController";
import categoryController from "./controllers/categoryController";
import tagController from "./controllers/tagController";

const app: Express = express();

const port: number = 4000;

app.use(express.json());

app.use(cors())

app.get('/ad', adsController.read);
app.post('/ad', adsController.create);
app.delete('/ad', adsController.delete);
app.put('/ad', adsController.put);

app.get('/category', categoryController.read);
app.post('/category', categoryController.create);
app.delete('/category', categoryController.delete);
app.put('/category', categoryController.put);

app.get('/tag', tagController.read);
app.post('/tag', tagController.create);
app.delete('/tag', tagController.delete);
app.put('/tag', tagController.put);

app.listen(port, async () => {
  await dataSource.initialize();
  console.log(`Example app listening on port ${port}`)
});