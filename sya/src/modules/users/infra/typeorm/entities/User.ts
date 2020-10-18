import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @Column({
    length: 100,
  })
  initial_hour: Date;

  @Column({
    length: 100,
  })
  finish_hour: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
