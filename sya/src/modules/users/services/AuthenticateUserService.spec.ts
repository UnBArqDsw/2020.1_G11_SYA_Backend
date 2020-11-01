import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider
    );
  });
  it('should be able to autheticate', async () => {
    const user = await fakeUserRepository.create({
      name: 'Sacola',
      email: 'pedraosacola@gmail.com',
      password: 'sacola',
      business_area: 'agronegocio',
      business_name: 'Indião Sementes - Produtos Agropecuários',
      cpf: '01001001010',
      initial_hour: new Date(2020, 5, 1),
      finish_hour: new Date(2020, 5, 1),
      operating_day: 'S-T-Q-Q',
    });
    const response = await authenticateUser.execute({
      email: 'pedraosacola@gmail.com',
      password: 'sacola',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to autheticate nonexistent user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'indiao@example.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to autheticate user with wrong password', async () => {
    await fakeUserRepository.create({
      name: 'Sacola',
      email: 'pedraosacola@gmail.com',
      password: 'sacola',
      business_area: 'agronegocio',
      business_name: 'Indião Sementes - Produtos Agropecuários',
      cpf: '01001001010',
      initial_hour: new Date(2020, 5, 1),
      finish_hour: new Date(2020, 5, 1),
      operating_day: 'S-T-Q-Q',
    });

    await expect(
      authenticateUser.execute({
        email: 'pedraosacola@gmail.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
