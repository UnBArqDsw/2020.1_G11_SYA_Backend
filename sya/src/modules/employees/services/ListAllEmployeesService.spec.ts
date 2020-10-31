import FakeEmployeeRepository from '@modules/employees/repositories/fakes/FakeEmployeeRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import ListAllEmployeesService from '@modules/employees/services/ListAllEmployeesService';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import CreateEmployeeService from '@modules/employees/services/CreateEmployeeService';
import CreateUserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';

let fakeEmployeeRepository: FakeEmployeeRepository;
let listAllEmployees: ListAllEmployeesService;
let fakeUserRepository: FakeUserRepository;
let createEmployee: CreateEmployeeService;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateEmployee', () => {
  beforeEach(() => {
    fakeEmployeeRepository = new FakeEmployeeRepository();
    fakeEmployeeRepository = new FakeEmployeeRepository();
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    listAllEmployees = new ListAllEmployeesService(fakeEmployeeRepository);
    createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
    createEmployee = new CreateEmployeeService(
      fakeEmployeeRepository,
      fakeUserRepository
    );
  });
  it('should be able to list only one employee', async () => {
    const user = await createUser.execute({
      name: 'Indião',
      email: 'indiao@example.com',
      password: '123456',
      business_area: 'agronegocio',
      business_name: 'Indião Sementes - Produtos Agropecuários',
      cpf: '12345678909',
      initial_hour: new Date(2020, 5, 2),
      finish_hour: new Date(2020, 5, 1),
      operating_day: 'S-T-Q-Q',
    });

    const employee = await createEmployee.execute({
      name: 'Pedrão Sacola',
      user_id: user.id,
    });

    const allEmployees = await listAllEmployees.execute({
      user_id: user.id,
    });

    expect(allEmployees).toHaveLength(1);
    expect(allEmployees).toContain(employee);
  });

  it('should be able to list more then one employee', async () => {
    const user = await createUser.execute({
      name: 'Indião',
      email: 'indiao@example.com',
      password: '123456',
      business_area: 'agronegocio',
      business_name: 'Indião Sementes - Produtos Agropecuários',
      cpf: '12345678909',
      initial_hour: new Date(2020, 5, 2),
      finish_hour: new Date(2020, 5, 1),
      operating_day: 'S-T-Q-Q',
    });

    const employee_1 = await createEmployee.execute({
      name: 'Pedrão Sacola',
      user_id: user.id,
    });

    const employee_2 = await createEmployee.execute({
      name: 'Indião',
      user_id: user.id,
    });

    const employee_3 = await createEmployee.execute({
      name: 'Dani boy',
      user_id: user.id,
    });

    const allEmployees = await listAllEmployees.execute({
      user_id: user.id,
    });

    expect(allEmployees).toHaveLength(3);
    expect(allEmployees).toContain(employee_1);
    expect(allEmployees).toContain(employee_2);
    expect(allEmployees).toContain(employee_3);
  });

  it('should be able to list only zero employees', async () => {
    const user = await createUser.execute({
      name: 'Indião',
      email: 'indiao@example.com',
      password: '123456',
      business_area: 'agronegocio',
      business_name: 'Indião Sementes - Produtos Agropecuários',
      cpf: '12345678909',
      initial_hour: new Date(2020, 5, 2),
      finish_hour: new Date(2020, 5, 1),
      operating_day: 'S-T-Q-Q',
    });

    const allEmployees = await listAllEmployees.execute({
      user_id: user.id,
    });

    expect(allEmployees).toHaveLength(0);
  });
});
