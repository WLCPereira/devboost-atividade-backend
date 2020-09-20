"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postReservations = exports.getReservations = void 0;
const typeorm_1 = require("typeorm");
const repository_1 = require("../repository");
exports.getReservations = async (req, res) => {
    const connection = await typeorm_1.createConnection();
    const { id: reqID } = await req.params;
    const roomsRepository = connection.getRepository(repository_1.Room);
    if (reqID === undefined || reqID === null) {
        connection.close();
        return res.status(400).json({ massage: 'Invalid id' });
    }
    const room = await roomsRepository.find({
        where: {
            id: reqID,
        },
        relations: ['reservations'],
    });
    connection.close();
    if (room === undefined) {
        return res.status(502).json({ massage: 'There is no Room width this id!' });
    }
    return res.json({
        room,
    });
};
exports.postReservations = async (req, res) => {
    const { id: reqID } = await req.params;
    const { checkIn, checkOut, createdAt } = await req.body;
    const connection = await typeorm_1.createConnection();
    const roomsRepository = connection.getRepository(repository_1.Room);
    if (reqID === undefined || reqID === null) {
        connection.close();
        return res.status(400).json({ massage: 'Invalid id' });
    }
    const reservationsRepository = connection.getRepository(repository_1.Reservation);
    const room = await roomsRepository.find({
        where: {
            id: reqID,
        },
    });
    const reservation = new repository_1.Reservation(checkIn, checkOut, createdAt);
    reservation.room = room[0];
    await reservationsRepository.save(reservation);
    connection.close();
    return res.json({
        id: reservation.id,
    });
};
