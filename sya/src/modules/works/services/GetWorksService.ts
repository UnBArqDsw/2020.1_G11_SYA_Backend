import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import Work from '../infra/typeorm/entities/Work';
import IWorkRepository from '../repositories/IWorkRepository';

@injectable()
class GetWorksService {
  constructor(
    @inject('WorkRepository')
    private worksRepository: IWorkRepository,

    @inject('UserRepository')
    private usersRepository: IUserRepository
  ) {}

  async execute({ user_id }: Record<string, any>): Promise<Work[]> {
    const checkUserId = await this.usersRepository.findById(user_id);
    if (!checkUserId) {
      throw new AppError('User not found');
    }
    const works = await this.worksRepository.findAllWorks(user_id);
    return works;
  }
}

export default GetWorksService;
