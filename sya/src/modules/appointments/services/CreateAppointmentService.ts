import { injectable, inject } from 'tsyringe';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import AppError from '@shared/errors/AppError';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository,

    @inject('UserRepository')
    private usersRepository: IUserRepository
  ) {}

  public async execute({
    date,
    user_id,
    work_id,
    employee_id,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const checkUserId = await this.usersRepository.findById(user_id);

    if (!checkUserId) {
      throw new AppError('User not found');
    }
    const appointment = await this.appointmentRepository.create({
      date,
      user_id,
      work_id,
      employee_id,
    });
    return appointment;
  }
}

export default CreateAppointmentService;
