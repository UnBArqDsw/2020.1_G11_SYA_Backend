import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import { classToClass } from 'class-transformer';
import ListAppointmentsService from '@modules/appointments/services/ListAppointmentsService';

export default class AppointmentController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { date,user_id,work_id,employee_id } = request.body;

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      date,
      user_id,
      work_id,
      employee_id
    });

    return response.json(classToClass(appointment));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listAppointments = container.resolve(ListAppointmentsService);

    const appointments = await listAppointments.execute({ user_id });

    return response.json(appointments);
  }
}
