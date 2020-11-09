import ICreateWorkDTO from '@modules/works/dtos/ICreateWorkDTO';
import IWorkRepository from '@modules/works/repositories/IWorkRepository';
import { getRepository, Repository } from 'typeorm';
import Work from '../entities/Work';

class WorkRepository implements IWorkRepository {
  private ormRepository: Repository<Work>;

  constructor() {
    this.ormRepository = getRepository(Work);
  }

  public findById(id: string): Promise<Work | undefined> {
    const findWork = this.ormRepository.findOne(id);
    return findWork;
  }

  public async create(workData: ICreateWorkDTO): Promise<Work> {
    const work = this.ormRepository.create(workData);
    await this.ormRepository.save(work);
    return work;
  }

  public findAllWorks(user_id: string): Promise<Work[]> {
    const findWorks = this.ormRepository.find({ where: { user_id } });
    return findWorks;
  }
}

export default WorkRepository;
