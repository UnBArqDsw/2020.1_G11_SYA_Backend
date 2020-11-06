import Employee from '@modules/employees/infra/typeorm/entities/Employee';
import ICreateEmployeeDTO from '@modules/employees/dtos/ICreateEmployeeDTO';

export default interface IEmployeeRepository {
  findById(id: string): Promise<Employee | undefined>;
  create(EmployeeData: ICreateEmployeeDTO): Promise<Employee>;
  findAllEmployess(user_id: string): Promise<Employee[]>;
}
