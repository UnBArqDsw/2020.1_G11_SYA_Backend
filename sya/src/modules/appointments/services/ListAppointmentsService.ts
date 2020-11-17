import { injectable, inject } from 'tsyringe';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import AppError from '@shared/errors/AppError';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import Appointment from '../infra/typeorm/entities/Appointment';

interface IRequest {
  user_id: string;
}

@injectable()
class ListAppointmentsService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository,

    @inject('UserRepository')
    private usersRepository: IUserRepository
  ) {}

  public async execute({
    user_id,
  }: IRequest): Promise<Appointment[]> {
    const checkUserId = await this.usersRepository.findById(user_id);
    if (!checkUserId) {
      throw new AppError('User not found');
    }
    const appointments = await this.appointmentRepository.findByUserId(user_id);
    return appointments;
  }
}

export default ListAppointmentsService;
