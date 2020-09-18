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

  @OneToMany((type) => Rooms, (rooms) => rooms.hotel)
  rooms: Rooms[];

  constructor({ nome, descricao, endereco, cidade, estrelas, foto }: IHotels) {
    this.nome = nome;
    this.descricao = descricao;
    this.endereco = endereco;
    this.cidade = cidade;
    this.estrelas = estrelas;
    this.foto = foto;
  }
}
