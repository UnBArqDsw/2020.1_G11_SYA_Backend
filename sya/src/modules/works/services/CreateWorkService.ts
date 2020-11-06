import { injectable, inject } from 'tsyringe';
import Work from '../infra/typeorm/entities/Work';
import IWorkRepository from '../repositories/IWorkRepository';
import ICreateWorkDTO from '../dtos/ICreateWorkDTO';

@injectable()
class CreateWorkService {
  constructor(
    @inject('WorkRepository')
    private worksRepository: IWorkRepository
  ) {}

  async execute({
    name,
    price,
    duration,
    user_id,
  }: ICreateWorkDTO): Promise<Work> {
    const work = await this.worksRepository.create({
      name,
      price,
      duration,
      user_id,
    });
    return work;
  }
}

export default CreateWorkService;
