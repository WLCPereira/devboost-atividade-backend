import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Room from './Rooms';
// Entidade representa uma tables no DB
@Entity('reservations')
export default class Reservation {
  // chave primaria auto incremental
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime' })
  checkIn: Date;

  @Column({ type: 'datetime' })
  checkOut: Date;

  @Column({ type: 'datetime' })
  createdAt: Date;

  @ManyToOne((type) => Room, (room) => room.reservations)
  room: Room;

  constructor(checkIn: Date, checkOut: Date, createdAt: Date) {
    this.checkIn = checkIn;
    this.checkOut = checkOut;
    this.createdAt = createdAt;
  }
}
