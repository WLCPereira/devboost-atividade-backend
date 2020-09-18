"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const { Application, Request, Response }, { Application, Request, Response } = require('express');
const router = express.Router();
const Rooms_1 = __importDefault(require("../../repository/Rooms"));
router.route('/').get(async (req, res) => {
    const connection = await typeorm_1.createConnection();
    const roomRepository = connection.getRepository(Rooms_1.default);
    const rooms = await roomRepository.find();
    connection.close();
    return res.json({
        rooms,
    });
});
