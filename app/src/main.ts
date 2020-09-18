import "reflect-metadata";
import express, { Application, Request, Response } from "express";
import { Connection, createConnection, Repository } from "typeorm";
 
//routes
import Room from "./server/routers/rooms"

import Hotel from "./repository/Hotels";
import IHotels  from "./repository/interfaces/IHotels";

const app: Application = express();

// carrega o json enviado no corpo(body)
app.use(express.json());

app.get("/hotels", async (req: Request, res: Response): Promise<Response> => {
    const connection = await createConnection();

    const hotelRepository: Repository<Hotel> = connection.getRepository(Hotel);

    const hotels: Hotel[] = await hotelRepository.find();
    
    connection.close();

    return res.json({
        hotels
    });
});

app.post("/hotels", async (req: Request, res: Response): Promise<Response> => {
    const connection = await createConnection();

    const hotelRepository: Repository<Hotel> = connection.getRepository(Hotel);

    const hotel: Hotel = new Hotel(IHotels);// nao entendi esta passando a interface?

    await hotelRepository.save(hotel); // &user.id = 1

    connection.close();

    return res.json({
        id: hotel.id
    });
});

//  Rooms
app.use("/rooms", Room)

const port: any = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor up na porta ${port}`);
});