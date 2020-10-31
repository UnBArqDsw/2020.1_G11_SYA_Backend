import { injectable, inject } from 'tsyringe';

import Employee from '../infra/typeorm/entities/Employee';
import IEmployeeRepository from '../repositories/IEmployeeRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class ListAllEmployeesService {
  constructor(
    @inject('EmployeeRepository')
    private employeesRepository: IEmployeeRepository
  ) {}

  public async execute({ user_id }: IRequest): Promise<Employee[]> {
    const employees = await this.employeesRepository.findAllEmployess(user_id);

    return employees;
  }
}

export default ListAllEmployeesService;
