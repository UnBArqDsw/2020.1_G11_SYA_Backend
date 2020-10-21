import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
  });
  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
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

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    await createUser.execute({
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

    await expect(
      createUser.execute({
        name: 'Indião',
        email: 'indiao@example.com',
        password: '123456',
        business_area: 'agronegocio',
        business_name: 'Indião Sementes - Produtos Agropecuários',
        cpf: '01001001010',
        initial_hour: new Date(2020, 5, 1),
        finish_hour: new Date(2020, 5, 1),
        operating_day: 'S-T-Q-Q',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});

// verificar se o cpf é valido
// verificar se existe um usuário com o mesmo cpf
// verificar se a initial hora é igual a finish hour
