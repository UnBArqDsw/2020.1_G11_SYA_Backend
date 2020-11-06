import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import EmployeeRepository from '@modules/employees/infra/typeorm/repositories/EmployeeRepository';
import IEmployeeRepository from '@modules/employees/repositories/IEmployeeRepository';
import WorkRepository from '@modules/works/infra/typeorm/repositories/WorkRepository';
import IWorkRepository from '@modules/works/repositories/IWorkRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IEmployeeRepository>(
  'EmployeeRepository',
  EmployeeRepository
);
container.registerSingleton<IWorkRepository>('WorkRepository', WorkRepository);
