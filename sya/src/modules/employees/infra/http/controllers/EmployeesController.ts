import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateEmployeeService from '@modules/employees/services/CreateEmployeeService';
import { classToClass } from 'class-transformer';

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
}
