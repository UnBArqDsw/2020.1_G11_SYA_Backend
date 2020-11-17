import { injectable, inject } from 'tsyringe';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import AppError from '@shared/errors/AppError';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IEmployeeRepository from '@modules/employees/repositories/IEmployeeRepository';
import IWorkRepository from '@modules/works/repositories/IWorkRepository';
import { isBefore, startOfHour }  from 'date-fns'

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository,

    @inject('UserRepository')
    private usersRepository: IUserRepository,

    @inject('EmployeeRepository')
    private employeeRepository: IEmployeeRepository,

    @inject('WorkRepository')
    private workRepository: IWorkRepository
  ) {}

  public async execute({
    date,
    user_id,
    work_id,
    employee_id,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const checkUserId = await this.usersRepository.findById(user_id);
    const checkEmployeeId = await this.employeeRepository.findById(user_id);
    const checkWorkId = await this.workRepository.findById(user_id);
    const appointmentDate = startOfHour(new Date(date))
    const checkDate = await this.appointmentRepository.findByDate(date,user_id);

    if(isBefore(appointmentDate,Date.now())){
      throw new AppError('You can not create an appointment on a past date');
    }

    if (!checkUserId && !checkEmployeeId && !checkWorkId) {
      throw new AppError('User or employee or work not found');
    }

    if(!checkDate){
      throw new AppError('This appointment is already booked');
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
