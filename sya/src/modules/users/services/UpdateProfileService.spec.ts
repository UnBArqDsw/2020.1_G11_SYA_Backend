import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUserRepository: FakeUserRepository;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();

    updateProfile = new UpdateProfileService(fakeUserRepository);
  });
  it('should be able to update the profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'Indião',
      email: 'indiao@example.com',
      password: '123456',
      business_area: 'agronegocio',
      business_name: 'Indião Sementes - Produtos Agropecuários',
      cpf: '01001001010',
      initial_hour: new Date(2020, 5, 1),
      finish_hour: new Date(2020, 5, 1),
      operating_day: 'S-T-Q-Q',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Indião Bazero',
      email: 'indiaobazero@example.com',
      business_area: 'esmalteria',
      business_name: 'Indião Esmaltes',
      initial_hour: new Date(2020, 5, 1),
      finish_hour: new Date(2020, 5, 1),
      operating_day: 'S-T-Q-Q',
    });

    expect(updatedUser.name).toBe('Indião Bazero');
    expect(updatedUser.email).toBe('indiaobazero@example.com');
    expect(updatedUser.business_area).toBe('esmalteria');
    expect(updatedUser.business_name).toBe('Indião Esmaltes');
    expect(updatedUser.operating_day).toBe('S-T-Q-Q');
  });

  it('should be able to update the profile from non existing user', async () => {
    expect(
      updateProfile.execute({
        user_id: 'user.id',
        name: 'Indião',
        email: 'indiao@example.com',
        business_area: 'agronegocio',
        business_name: 'Indião Sementes - Produtos Agropecuários',
        initial_hour: new Date(2020, 5, 1),
        finish_hour: new Date(2020, 5, 1),
        operating_day: 'S-T-Q-Q',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be not able to another user email', async () => {
    await fakeUserRepository.create({
      name: 'Indião',
      email: 'indiao@example.com',
      password: '123456',
      business_area: 'agronegocio',
      business_name: 'Indião Sementes - Produtos Agropecuários',
      cpf: '01001001010',
      initial_hour: new Date(2020, 5, 1),
      finish_hour: new Date(2020, 5, 1),
      operating_day: 'S-T-Q-Q',
    });

    const user = await fakeUserRepository.create({
      name: 'Satchel',
      email: 'satchel@example.com',
      password: '124564',
      business_area: 'sacolão',
      business_name: 'Sacolão do Pedrão',
      cpf: '019209323290',
      initial_hour: new Date(2020, 5, 1),
      finish_hour: new Date(2020, 5, 1),
      operating_day: 'S-T-Q-Q',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Indião',
        email: 'indiao@example.com',
        business_area: 'agronegocio',
        business_name: 'Indião Sementes - Produtos Agropecuários',
        initial_hour: new Date(2020, 5, 1),
        finish_hour: new Date(2020, 5, 1),
        operating_day: 'S-T-Q-Q',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
