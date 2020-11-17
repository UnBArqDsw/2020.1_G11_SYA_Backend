import User from '@modules/users/infra/typeorm/entities/User';
import Work from '@modules/works/infra/typeorm/entities/Work';
import Employee from '@modules/employees/infra/typeorm/entities/Employee';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('employees')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  user_id: string;

  @Column()
  work_id: string;

  @Column()
  employee_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Work)
  @JoinColumn({ name: 'work_id' })
  work: Work;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;
}

export default Appointment;
