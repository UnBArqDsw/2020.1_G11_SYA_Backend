import Work from '@modules/works/infra/typeorm/entities/Work';
import ICreateWorkDTO from '@modules/works/dtos/ICreateWorkDTO';

export default interface IWorkRepository {
  findById(id: string): Promise<Work | undefined>;
  create(WorkData: ICreateWorkDTO): Promise<Work>;
}
