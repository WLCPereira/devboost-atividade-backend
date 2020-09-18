"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const Rooms_1 = __importDefault(require("../../repository/Rooms"));
router.route('/')
    .get(async (req, res) => {
    const connection = await typeorm_1.createConnection();
    const roomRepository = connection.getRepository(Rooms_1.default);
    const rooms = await roomRepository.find();
    connection.close();
    return res.json({
        rooms,
    });
})
    .post(async (req, res) => {
    const connection = await typeorm_1.createConnection();
    const { numero, tamanho } = req.body;
    const roomRepository = connection.getRepository(Rooms_1.default);
    const room = new Rooms_1.default({ numero, tamanho });
    await roomRepository.save(room);
    connection.close();
    return res.json({
        id: room.id
    });
});
exports.default = router;
