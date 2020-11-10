import ICreateEmployeeDTO from '@modules/employees/dtos/ICreateEmployeeDTO';
import IEmployeeRepository from '@modules/employees/repositories/IEmployeeRepository';
import { getRepository, Repository } from 'typeorm';
import Employee from '../entities/Employee';

class EmployeeRepository implements IEmployeeRepository {
  private ormEmployeeRepository: Repository<Employee>;

  constructor() {
    this.ormEmployeeRepository = getRepository(Employee);
  }

  public findById(id: string): Promise<Employee | undefined> {
    const findEmployee = this.ormEmployeeRepository.findOne(id);
    return findEmployee;
  }

  public async create(employeeData: ICreateEmployeeDTO): Promise<Employee> {
    const employee = this.ormEmployeeRepository.create(employeeData);
    await this.ormEmployeeRepository.save(employee);
    return employee;
  }

  public findAllEmployess(user_id: string): Promise<Employee[]> {
    const findEmployees = this.ormEmployeeRepository.find({
      where: { user_id },
    });
    return findEmployees;
  }
}

export default EmployeeRepository;
