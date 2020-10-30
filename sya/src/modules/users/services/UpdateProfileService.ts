import { injectable, inject } from 'tsyringe';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  business_area: string;
  business_name: string;
  finish_hour: Date;
  initial_hour: Date;
  operating_day: string;
}
@injectable()
class UpdateProfileService {
  /* Passamos esse construtor pois o service não precisa ter noção se estamos utilizando
  typeorm */
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository
  ) {}

  public async execute({
    user_id,
    name,
    email,
    business_area,
    business_name,
    finish_hour,
    initial_hour,
    operating_day,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
      throw new AppError('E-mail already in use');
    }

    user.name = name;
    user.email = email;

    user.business_area = business_area;
    user.business_name = business_name;
    user.finish_hour = finish_hour;
    user.initial_hour = initial_hour;
    user.operating_day = operating_day;

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
