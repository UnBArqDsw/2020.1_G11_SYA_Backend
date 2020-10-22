import ICreateEmployeeDTO from '@modules/employees/dtos/ICreateEmployeeDTO';
import IEmployeeRepository from '@modules/employees/repositories/IEmployeeRepository';
import { getRepository, Repository } from 'typeorm';
import Employee from '../entities/Employee';

class EmployeeRepository implements IEmployeeRepository {
  private ormRepository: Repository<Employee>;

  constructor() {
    this.ormRepository = getRepository(Employee);
  }

  public findById(id: string): Promise<Employee | undefined> {
    const findEmployee = this.ormRepository.findOne(id);
    return findEmployee;
  }

  public async create(employeeData: ICreateEmployeeDTO): Promise<Employee> {
    const employee = this.ormRepository.create(employeeData);
    await this.ormRepository.save(employee);
    return employee;
  }

  public findByUserId(id: string): Promise<Employee[] | undefined> {
    const user_id = id;
    const findEmployees = this.ormRepository.find({ where: { user_id } });
    return findEmployees;
  }
}

export default EmployeeRepository;
