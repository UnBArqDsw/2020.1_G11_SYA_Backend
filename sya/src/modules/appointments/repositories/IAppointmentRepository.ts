import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

export default interface IAppointmentRepository {
  create(EmployeeData: ICreateAppointmentDTO): Promise<Appointment>;
  findByEmployeeId(
    user_id: string,
    employee_id: string
  ): Promise<Appointment[]>;
  findByUserId(user_id: string): Promise<Appointment[]>;
  findByDate(date: Date,user_id: string): Promise<Appointment | undefined>
}
