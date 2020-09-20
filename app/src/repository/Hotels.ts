import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IHotels } from './interfaces';
import Rooms from './Rooms';

@Entity('Hotel')
export default class Hotels {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  descricao: string;

  @Column()
  endereco: string;

  @Column()
  cidade: string;

  @Column()
  estrelas: number;

  @Column()
  foto: string;

  @OneToMany((type) => Rooms, (room) => room.hotel)
  rooms: Rooms[];

  constructor(
    nome: string,
    descricao: string,
    endereco: string,
    cidade: string,
    estrelas: number,
    foto: string
  ) {
    this.nome = nome;
    this.descricao = descricao;
    this.endereco = endereco;
    this.cidade = cidade;
    this.estrelas = estrelas;
    this.foto = foto;
  }
}
