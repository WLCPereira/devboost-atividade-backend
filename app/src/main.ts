import 'reflect-metadata';
import express, { Application } from 'express';
import {
  getHotels,
  postHotels,
  getRooms,
  postRooms,
  getReservations,
  postReservations,
} from './controllers';

//routes

const app: Application = express();

// carrega o json enviado no corpo(body)
app.use(express.json());
//Hotels.
app.get('/hotels', getHotels);
app.post('/hotels', postHotels);

//  Rooms
app.get('/hotel/:id', getRooms);
app.post('/hotel/:id', postRooms);

// reservations
app.get('/room/:id', getReservations);
app.post('/room/:id', postReservations);

const port: any = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor up na porta ${port}`);
});
