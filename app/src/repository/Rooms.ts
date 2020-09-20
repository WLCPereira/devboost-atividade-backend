import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import Hotel from './Hotels';
import Reservation from './Reservations';

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

  @OneToMany((type) => Reservation, (reservations) => reservations.room)
  reservations: Reservation[];

  constructor(numero: number, tamanho: string) {
    this.numero = numero;
    this.tamanho = tamanho;
  }
}
