import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IReservations } from './interfaces';
import Rooms from './Rooms';
// Entidade representa uma tables no DB
@Entity('reservations')
export default class Reservations {
  // chave primaria auto incremental
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime' })
  checkIn: Date;

  @Column({ type: 'datetime' })
  checkOut: Date;

  @Column({ type: 'datetime' })
  createdAt: Date;

  @ManyToOne((type) => Rooms, (room) => room.id)
  room: Rooms[];

  constructor({ checkIn, checkOut, createdAt }: IReservations) {
    this.checkIn = checkIn;
    this.checkOut = checkOut;
    this.createdAt = createdAt;
  }
}
