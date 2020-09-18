"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Reservations_1 = __importDefault(require("../../repository/Reservations"));
const express = require('express');
const router = express.Router();
router.route('/reservations')
    .get(async (req, res) => {
    const connection = await typeorm_1.createConnection();
    const reservationRepository = connection.getRepository(Reservations_1.default);
    const reservations = await reservationRepository.find();
    connection.close();
    return res.json({ reservations });
});
// app.post("/rooms", async (req: Request, res: Response): Promise<Response> => {
//     res.send(201)
// });
