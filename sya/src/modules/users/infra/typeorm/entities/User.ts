import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 100,
  })
  name: string;

  @Column({
    length: 100,
  })
  email: string;

  @Column({
    length: 100,
  })
  cpf: string;

  @Column({
    length: 100,
  })
  operating_day: string;

  @Column({
    length: 100,
  })
  @Exclude()
  password: string;

  @Column({
    length: 100,
  })
  business_area: string;

  @Column()
  avatar: string;

  @Column({
    length: 100,
  })
  business_name: string;

  @Column()
  initial_hour: Date;

  @Column()
  finish_hour: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
