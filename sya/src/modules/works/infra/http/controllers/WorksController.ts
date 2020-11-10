import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateWorkService from '@modules/works/services/CreateWorkService';
import GetWorksService from '@modules/works/services/GetWorksService';
import { classToClass } from 'class-transformer';

export default class WorksController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, duration } = request.body;
    const user_id = request.user.id;

    const createWork = container.resolve(CreateWorkService);

    const work = await createWork.execute({
      name,
      price,
      duration,
      user_id,
    });

    return response.json(classToClass(work));
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const getWorks = container.resolve(GetWorksService);

    const works = await getWorks.execute({
      user_id,
    });

    return response.json(classToClass(works));
  }
}
