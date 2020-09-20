import { error } from 'console';
import { Request, Response } from 'express';
import { Connection, createConnection, Repository } from 'typeorm';
import { Room, Reservation, IReservations } from '../repository';

interface idInterface {
  id?: number;
}

export const getReservations = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const connection: Connection = await createConnection();
  const { id: reqID }: idInterface = await req.params;
  const roomsRepository: Repository<Room> = connection.getRepository(Room);

  if (reqID === undefined || reqID === null) {
    connection.close();
    return res.status(400).json({ massage: 'Invalid id' });
  }

  const room: Room[] | undefined = await roomsRepository.find({
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

export const postReservations = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id: reqID }: idInterface = await req.params;
  const { checkIn, checkOut, createdAt }: IReservations = await req.body;
  const connection: Connection = await createConnection();
  const roomsRepository: Repository<Room> = connection.getRepository(Room);

  if (reqID === undefined || reqID === null) {
    connection.close();
    return res.status(400).json({ massage: 'Invalid id' });
  }

  const reservationsRepository: Repository<Reservation> = connection.getRepository(
    Reservation
  );
  const room: Room[] | undefined = await roomsRepository.find({
    where: {
      id: reqID,
    },
  });

  const reservation = new Reservation(checkIn, checkOut, createdAt);
  reservation.room = room[0];
  await reservationsRepository.save(reservation);

  connection.close();

  return res.json({
    id: reservation.id,
  });
};
