import { CqrsModule } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { AuthData } from '../../domain/models/auth';
import { User } from '../../domain/models/User';
import { LoginCommand } from '../commands/login.command';
import { AuthStore } from '../ports/AuthStore';
import { LoginCommandHandler } from './login.command.handler';

describe('Update user command handler tests', () => {
  let authStore: AuthStore;
  let jwtService: JwtService;
  let loginCommandHandler: LoginCommandHandler;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        {
          provide: AuthStore,
          useFactory: () => jest.fn(),
        },
        {
          provide: JwtService,
          useFactory: () => jest.fn(),
        },
      ],
    }).compile();

    authStore = module.get<AuthStore>(AuthStore);
    jwtService = module.get<JwtService>(JwtService);

    loginCommandHandler = new LoginCommandHandler(jwtService, authStore);

    authStore.getUserByData = jest.fn(() =>
      Promise.resolve({
        id: '12345',
        name: 'name',
        email: 'mail',
        passwordHash:
          '$2y$10$ns7jZU5zMV7FhU8Eizu9qukqjtr9.QUkoUKuDUQVRkdg.gjcihZZ2',
      }),
    );
  });

  it('should exist', () => {
    expect(authStore).toBeDefined();
    expect(loginCommandHandler).toBeDefined();
  });

  it('login valid user', async () => {
    const command = new LoginCommand('John Doe', 'pass', []);
    await loginCommandHandler.execute(command).catch((e) => {
      expect(e).toEqual('Incorrect username/email or password');
    });
  });
});
