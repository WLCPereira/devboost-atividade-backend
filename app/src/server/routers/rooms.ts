import { Connection, createConnection, Repository } from 'typeorm';
import express, { Application, Request, Response } from "express";
const router = express.Router();

import Rooms from '../../repository/Rooms';
import IRooms from "../../repository/interfaces/IRooms";

router.route('/')
  .get(
    async (req: Request, res: Response): Promise<Response> => {
      const connection: Connection = await createConnection();

      const roomRepository: Repository<Rooms> = connection.getRepository(Rooms);

      const rooms: Rooms[] = await roomRepository.find();

      connection.close();

      return res.json({
        rooms,
      });
    }
  )
  .post(
    async (req: Request, res: Response): Promise<Response> => {
      const connection: Connection = await createConnection();
      const {numero, tamanho}:IRooms  = req.body;
      const roomRepository: Repository<Rooms> = connection.getRepository(Rooms);

      const room: Rooms = new Rooms({ numero,tamanho });

      await roomRepository.save(room);

      connection.close();

      return res.json({
          id: room.id
      });
    }
  )

  export default router;