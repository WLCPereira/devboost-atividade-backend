"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const Hotels_1 = require("./controllers/Hotels");
const Rooms_1 = require("./controllers/Rooms");
const Reservations_1 = require("./controllers/Reservations");
//routes
const app = express_1.default();
// carrega o json enviado no corpo(body)
app.use(express_1.default.json());
//Hotels.
app.get('/hotels', Hotels_1.getHotels);
app.post('/hotels', Hotels_1.postHotels);
//  Rooms
app.get('/hotel/:id', Rooms_1.getRooms);
app.post('/hotel/:id', Rooms_1.postRooms);
// reservations
app.get('/room/:id', Reservations_1.getReservations);
app.post('/room/:id', Reservations_1.postReservations);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor up na porta ${port}`);
});
