import { container } from 'tsyringe';

import '@modules/users/providers';

import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import EmployeeRepository from '@modules/employees/infra/typeorm/repositories/EmployeeRepository';
import IEmployeeRepository from '@modules/employees/repositories/IEmployeeRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IEmployeeRepository>(
  'EmployeeRepository',
  EmployeeRepository
);
