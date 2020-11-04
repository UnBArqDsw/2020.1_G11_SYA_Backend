import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateWorkService from '@modules/works/services/CreateWorkService';
import { classToClass } from 'class-transformer';

export default class WorksController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, duration } = request.body;

    const createWork = container.resolve(CreateWorkService);

    const work = await createWork.execute({
      name,
      price,
      duration,
    });

    return response.json(classToClass(work));
  }
}
