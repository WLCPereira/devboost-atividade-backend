import { error } from 'console';
import { Request, Response } from 'express';
import { Connection, createConnection, Repository } from 'typeorm';
import { Hotel, Room, IRooms } from '../repository';

interface idInterface {
  id?: number;
}

export const getRooms = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const connection: Connection = await createConnection();
  const { id: reqID }: idInterface = await req.params;
  const hotelsRepository: Repository<Hotel> = connection.getRepository(Hotel);

  if (reqID === undefined || reqID === null) {
    connection.close();
    return res.status(400).json({ massage: 'Invalid id' });
  }

  const hotel: Hotel[] | undefined = await hotelsRepository.find({
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

export const postRooms = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id: reqID }: idInterface = await req.params;
  const { numero, tamanho }: IRooms = await req.body;
  const connection: Connection = await createConnection();
  const hotelsRepository: Repository<Hotel> = connection.getRepository(Hotel);

  if (reqID === undefined || reqID === null) {
    connection.close();
    return res.status(400).json({ massage: 'Invalid id' });
  }

  const roomsRepository: Repository<Room> = connection.getRepository(Room);
  const hotel: Hotel[] | undefined = await hotelsRepository.find({
    where: {
      id: reqID,
    },
  });

  const room = new Room(numero, tamanho);
  room.hotel = hotel[0];
  await roomsRepository.save(room);

  connection.close();

  return res.json({
    id: room.id,
  });
};
