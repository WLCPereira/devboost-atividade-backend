import { Request, Response } from 'express';
import { Connection, createConnection, Repository } from 'typeorm';
import { Hotel, IHotels } from '../repository';

export const getHotels = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const connection = await createConnection();

  const hotelsRepository: Repository<Hotel> = connection.getRepository(Hotel);

  const hotels: Hotel[] = await hotelsRepository.find();

  connection.close();

  return res.json({
    hotels,
  });
};

export const postHotels = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const connection: Connection = await createConnection();

  const hotelsRepository: Repository<Hotel> = connection.getRepository(Hotel);

  const {
    nome,
    descricao,
    endereco,
    cidade,
    estrelas,
    foto,
  }: IHotels = req.body;

  const hotel: Hotel = new Hotel(
    nome,
    descricao,
    endereco,
    cidade,
    estrelas,
    foto
  );

  await hotelsRepository.save(hotel);

  connection.close();

  return res.json({ id: hotel.id });
};
