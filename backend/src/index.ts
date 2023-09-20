import express from 'express';

import { ads } from './data';

const app = express();
app.use(express.json());

const port: number = 3000;


app.get('/', (req, res) => {
  console.log(req);
  res.send('Hello World!')
});

app.get('/ad', (req, res) => {
  res.send(ads);
});

app.post('/ad', (req, res) => {
  console.log(req.body);
  ads.push(req.body);
  res.send("Ad has been added");
});

app.delete('/ad', (req, res)=> {
  // ca supprime par l'index, pas par l'id
  ads.splice(req.body.id, 1);
  res.send(`${req.body.id} has been delete`);

});

app.put('/ad', (req, res) => {
  ads[req.body.idToEdit] = req.body.newAdId;
  res.send(`${req.body.idToEdit} has been modify`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});