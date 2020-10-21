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
    const checkCPF = this.usersRepository.checkCPF(cpf)

    if (checkUserEmail) {
      throw new AppError('Email adress already used.');
    }
    if (checkUserCPF) {
      throw new AppError('CPF already used');
    }
    if (!checkCPF) {
      throw new AppError('Invalid CPF')
    }
    if (finish_hour == initial_hour) {
      throw new AppError('Initial hour equal finish hour')
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
