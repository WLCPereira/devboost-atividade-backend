"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRooms = exports.getRooms = void 0;
const typeorm_1 = require("typeorm");
const repository_1 = require("../repository");
exports.getRooms = async (req, res) => {
    const connection = await typeorm_1.createConnection();
    const { id: reqID } = await req.params;
    const hotelsRepository = connection.getRepository(repository_1.Hotel);
    if (reqID === undefined || reqID === null) {
        connection.close();
        return res.status(400).json({ massage: 'Invalid id' });
    }
    const hotel = await hotelsRepository.find({
        where: {
            id: reqID,
        },
        relations: ['rooms'],
    });
    connection.close();
    if (hotel[0] === undefined) {
        return res
            .status(502)
            .json({ massage: 'There is no hotel width this id!' });
    }
    return res.json({
        hotel
    });
};
exports.postRooms = async (req, res) => {
    const { id: reqID } = await req.params;
    const { numero, tamanho } = await req.body;
    const connection = await typeorm_1.createConnection();
    const hotelsRepository = connection.getRepository(repository_1.Hotel);
    if (reqID === undefined || reqID === null) {
        connection.close();
        return res.status(400).json({ massage: 'Invalid id' });
    }
    const roomsRepository = connection.getRepository(repository_1.Room);
    const hotel = await hotelsRepository.find({
        where: {
            id: reqID,
        },
    });
    const room = new repository_1.Room(numero, tamanho);
    room.hotel = hotel[0];
    await roomsRepository.save(room);
    connection.close();
    return res.json({
        id: room.id,
    });
};
