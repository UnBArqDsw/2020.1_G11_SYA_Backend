import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import { classToClass } from 'class-transformer';

export default class ProfileController {
  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const {
      name,
      email,
      business_area,
      business_name,
      finish_hour,
      initial_hour,
      operating_day,
    } = request.body;

    const updateUser = container.resolve(UpdateProfileService);

    const user = await updateUser.execute({
      user_id,
      name,
      email,
      business_area,
      business_name,
      finish_hour,
      initial_hour,
      operating_day,
    });

    return response.json(classToClass(user));
  }
}
