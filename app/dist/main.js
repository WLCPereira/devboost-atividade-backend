"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
//routes
const rooms_1 = __importDefault(require("./server/routers/rooms"));
const Hotels_1 = __importDefault(require("./repository/Hotels"));
const app = express_1.default();
// carrega o json enviado no corpo(body)
app.use(express_1.default.json());
app.get("/hotels", async (req, res) => {
    const connection = await typeorm_1.createConnection();
    const hotelRepository = connection.getRepository(Hotels_1.default);
    const hotels = await hotelRepository.find();
    connection.close();
    return res.json({
        hotels
    });
});
app.post("/hotels", async (req, res) => {
    const connection = await typeorm_1.createConnection();
    const hotelRepository = connection.getRepository(Hotels_1.default);
    const hotel = new Hotels_1.default(); // nao entendi esta passando a interface? Sim, era a intenção
    await hotelRepository.save(hotel); // &user.id = 1
    connection.close();
    return res.json({
        id: hotel.id
    });
});
//  Rooms
app.use("/rooms", rooms_1.default);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor up na porta ${port}`);
});
