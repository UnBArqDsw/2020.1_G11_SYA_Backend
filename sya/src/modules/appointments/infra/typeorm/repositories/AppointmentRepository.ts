import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import { getRepository, Repository } from 'typeorm';
import Appointment from '../entities/Appointment';

class AppointmentRepository implements IAppointmentRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public findByEmployeeId(
    user_id: string,
    employee_id: string
  ): Promise<Appointment[]> {
    const findAppointments = this.ormRepository.find({
      where: { user_id, employee_id },
    });
    return findAppointments;
  }

  public findByUserId(user_id: string): Promise<Appointment[]> {
    const findAppointments = this.ormRepository.find({ where: { user_id } });
    return findAppointments;
  }

  public async create(
    appointmentData: ICreateAppointmentDTO
  ): Promise<Appointment> {
    const appointment = this.ormRepository.create(appointmentData);
    await this.ormRepository.save(appointment);
    return appointment;
  }
}

export default AppointmentRepository;
