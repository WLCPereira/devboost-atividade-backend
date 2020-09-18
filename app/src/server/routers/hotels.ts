import { Connection, createConnection, Repository } from 'typeorm';
const express, { Application, Request, Response } = require('express');
const router = express.Router();

import Rooms from '../../repository/Rooms';

router.route('/').get(
  async (req: Request, res: Response): Promise<Response> => {
    const connection: Connection = await createConnection();

    const roomRepository: Repository<Rooms> = connection.getRepository(Rooms);

    const rooms: Rooms[] = await roomRepository.find();

    connection.close();

    return res.json({ rooms });
  }
);
