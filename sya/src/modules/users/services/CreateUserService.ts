import { injectable, inject } from 'tsyringe';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import User from '../infra/typeorm/entities/User';

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    name,
    cpf,
    email,
    business_area,
    business_name,
    finish_hour,
    initial_hour,
    operating_day,
    password,
  }: ICreateUserDTO): Promise<User> {
    const checkUserEmail = await this.usersRepository.findByEmail(email);
    const checkUserCPF = await this.usersRepository.findByCPF(cpf);

    if (checkUserEmail) {
      throw new AppError('Email adress already used.');
    }

    if (checkUserCPF) {
      throw new AppError('CPF already used');
    }

    if (finish_hour === initial_hour) {
      throw new AppError('Initial hour equal finish hour');
    }

    if (cpf == '00000000000') {
      throw new AppError('Invalid CPF.');
    }

    let sum;
    let rest;

    sum = 0;

    let i;
    for (i = 1; i <= 9; i++)
      sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    rest = (sum * 10) % 11;

    if (rest == 10 || rest == 11) rest = 0;
    if (rest != parseInt(cpf.substring(9, 10))) {
      throw new AppError('Invalid CPF.');
    }

    sum = 0;
    for (i = 1; i <= 10; i++)
      sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    rest = (sum * 10) % 11;

    if (rest == 10 || rest == 11) rest = 0;
    if (rest != parseInt(cpf.substring(10, 11))) {
      throw new AppError('Invalid CPF.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      cpf,
      email,
      business_area,
      business_name,
      finish_hour,
      initial_hour,
      operating_day,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
