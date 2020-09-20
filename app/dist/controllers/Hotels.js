"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postHotels = exports.getHotels = void 0;
const typeorm_1 = require("typeorm");
const repository_1 = require("../repository");
exports.getHotels = async (req, res) => {
    const connection = await typeorm_1.createConnection();
    const hotelsRepository = connection.getRepository(repository_1.Hotel);
    const hotels = await hotelsRepository.find();
    connection.close();
    return res.json({
        hotels,
    });
};
exports.postHotels = async (req, res) => {
    const connection = await typeorm_1.createConnection();
    const hotelsRepository = connection.getRepository(repository_1.Hotel);
    const { nome, descricao, endereco, cidade, estrelas, foto, } = req.body;
    const hotel = new repository_1.Hotel(nome, descricao, endereco, cidade, estrelas, foto);
    await hotelsRepository.save(hotel);
    connection.close();
    return res.json({ id: hotel.id });
};
