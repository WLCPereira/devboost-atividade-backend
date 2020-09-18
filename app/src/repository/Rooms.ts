import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { IRooms } from './interfaces';
import Hotel from './Hotels';
import Reservations from './Reservations';

@Entity('rooms')
export default class Rooms {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numero: number;

  @Column()
  tamanho: string;

  @ManyToOne((type) => Hotel, (hotel) => hotel.rooms)
  hotel: Hotel;

  @OneToMany((type) => Reservations, (reservation) => reservation.id)
  reservation: Reservations[];

  constructor({ numero, tamanho }: IRooms) {
    this.numero = numero;
    this.tamanho = tamanho;
  }
}
