import FakeEmployeeRepository from '@modules/employees/repositories/fakes/FakeEmployeeRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import CreateEmployeeService from '@modules/employees/services/CreateEmployeeService';
import CreateUserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';

let fakeEmployeeRepository: FakeEmployeeRepository
let fakeUserRepository: FakeUserRepository;
let createEmployee: CreateEmployeeService;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateEmployee', () => {
  beforeEach(() => {
    fakeEmployeeRepository = new FakeEmployeeRepository();
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
    createEmployee = new CreateEmployeeService(fakeEmployeeRepository, fakeUserRepository);
  });
  it('should be able to create a new employee using an axistent user', async () => {
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
      user_id: user.id
    });

    expect(employee).toHaveProperty('id');
  });

  it('should not be able to create a new employee without an axistent user', async () => {
    await expect(
      createEmployee.execute({
        name: 'Pedrão Sacola',
        user_id: '1'
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
