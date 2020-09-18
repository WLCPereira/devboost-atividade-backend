import { Connection, createConnection, Repository } from "typeorm";
import Reservations from "../../repository/Reservations";

const express = require('express')
const router= express.Router()



router.route('/reservations')
.get(async (req: Request, res: Response): Promise<Response> => {
    const connection = await createConnection();

    const reservationRepository: Repository<Reservations> = connection.getRepository(Reservations);

    const reservations: Reservations[] = await reservationRepository.find();
    
    connection.close();

    return res.json({reservations});
})


// app.post("/rooms", async (req: Request, res: Response): Promise<Response> => {
//     res.send(201)
// });
