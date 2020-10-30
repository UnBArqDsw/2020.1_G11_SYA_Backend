import { injectable, inject } from 'tsyringe';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import Employee from '../infra/typeorm/entities/Employee';
import IEmployeeRepository from '../repositories/IEmployeeRepository';
import ICreateEmployeeDTO from '../dtos/ICreateEmployeeDTO';

@injectable()
class CreateEmployeeService {
  constructor(
    @inject('EmployeeRepository')
    private employeesRepository: IEmployeeRepository,

    @inject('UserRepository')
    private usersRepository: IUserRepository
  ) {}

  public async execute({
    name,
    user_id,
  }: ICreateEmployeeDTO): Promise<Employee> {
    const checkUserId = await this.usersRepository.findById(user_id);

    if (!checkUserId) {
      throw new AppError('User not found');
    }
    const employee = await this.employeesRepository.create({
      name,
      user_id,
    });
    return employee;
  }
}

export default CreateEmployeeService;
