import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateEmployeeService from '@modules/employees/services/CreateEmployeeService';
import { classToClass } from 'class-transformer';
import ListAllEmployeesService from '@modules/employees/services/ListAllEmployeesService';

export default class EmployeesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, user_id } = request.body;

    const createEmployee = container.resolve(CreateEmployeeService);

    const employee = await createEmployee.execute({
      name,
      user_id,
    });

    return response.json(classToClass(employee));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listEmployess = container.resolve(ListAllEmployeesService);

    const employess = await listEmployess.execute({ user_id });

    return response.json(employess);
  }
}
