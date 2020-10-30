import IEmployeeRepository from '@modules/employees/repositories/IEmployeeRepository';
import Employee from '@modules/employees/infra/typeorm/entities/Employee';
import ICreateEmployeeDTO from '@modules/employees/dtos/ICreateEmployeeDTO';
import { uuid } from 'uuidv4';

class FakeEmployeeRepository implements IEmployeeRepository {
  private employees: Employee[] = [];

  public async findById(id: string): Promise<Employee | undefined> {
    const findEmployee = this.employees.find((employee) => employee.id === id);
    return findEmployee;
  }

  public async create(employeeData: ICreateEmployeeDTO): Promise<Employee> {
    const employee = new Employee();

    Object.assign(employee, { id: uuid() }, employeeData);

    this.employees.push(employee);

    return employee;
  }

  public async findAllEmployess(user_id: string): Promise<Employee[]> {
    const findEmployees = this.employees.filter(
      (employee) => employee.user_id === user_id
    );
    return findEmployees;
  }
}

export default FakeEmployeeRepository;
