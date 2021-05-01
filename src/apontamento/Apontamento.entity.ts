import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Apontamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  @Column()
  user: string;
}
