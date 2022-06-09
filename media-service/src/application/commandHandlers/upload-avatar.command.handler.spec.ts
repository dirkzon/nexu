import { CqrsModule, EventBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { UploadAvatarCommand } from '../commands/upload-avatar.command';
import { MediaStore } from '../ports/mediaStore';
import { UploadAvatarCommandHandler } from './upload-avatar.command.handler';
import sharp from 'sharp';
import path from 'path';

describe('Upload avatar command handler tests', () => {
  let mediaStore: MediaStore;
  let eventBusSpy: jest.SpyInstance;
  let uploadAvatarCommandHandler: UploadAvatarCommandHandler;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        {
          provide: MediaStore,
          useFactory: () => jest.fn(),
        },
      ],
    }).compile();

    mediaStore = module.get<MediaStore>(MediaStore);
    const eventBus = module.get<EventBus>(EventBus);
    eventBusSpy = jest.spyOn(eventBus, 'publish');

    uploadAvatarCommandHandler = new UploadAvatarCommandHandler(
      mediaStore,
      eventBus,
    );

    mediaStore.uploadImage = jest.fn(() => Promise.resolve('url'));
  });

  it('should exist', () => {
    expect(mediaStore).toBeDefined();
    expect(uploadAvatarCommandHandler).toBeDefined();
  });

  it('Upload avatar with valid id', async () => {
    const buffer = await sharp(
      path.join(__dirname, '../../../test', 'test.png'),
    ).toBuffer();
    const command = new UploadAvatarCommand(
      '12345',
      'name',
      'encoding',
      'image/png',
      buffer,
      '54321',
    );
    await uploadAvatarCommandHandler.execute(command);
    expect(mediaStore.uploadImage).toHaveBeenCalledTimes(1);
    expect(eventBusSpy).toHaveBeenCalledTimes(1);
  });

  it('Upload avatar with invalid user id', async () => {
    const buffer = await sharp(
      path.join(__dirname, '../../../test', 'test.png'),
    ).toBuffer();
    expect.assertions(1);
    try {
      const command = new UploadAvatarCommand(
        '',
        'name',
        'encoding',
        'image/png',
        buffer,
        '54321',
      );
      await uploadAvatarCommandHandler.execute(command);
    } catch (e) {
      expect((e as Error).message).toEqual('userId should not be empty');
    }
  });

  it('Upload avatar with invalid name', async () => {
    const buffer = await sharp(
      path.join(__dirname, '../../../test', 'test.png'),
    ).toBuffer();
    expect.assertions(1);
    try {
      const command = new UploadAvatarCommand(
        '12345',
        '',
        'encoding',
        'image/png',
        buffer,
        '54321',
      );
      await uploadAvatarCommandHandler.execute(command);
    } catch (e) {
      expect((e as Error).message).toEqual('name should not be empty');
    }
  });

  it('Upload avatar with invalid encoding', async () => {
    const buffer = await sharp(
      path.join(__dirname, '../../../test', 'test.png'),
    ).toBuffer();
    expect.assertions(1);
    try {
      const command = new UploadAvatarCommand(
        '12345',
        'name',
        '',
        'image/png',
        buffer,
        '54321',
      );
      await uploadAvatarCommandHandler.execute(command);
    } catch (e) {
      expect((e as Error).message).toEqual('encoding should not be empty');
    }
  });

  it('Upload avatar with invalid mimetype', async () => {
    const buffer = await sharp(
      path.join(__dirname, '../../../test', 'test.png'),
    ).toBuffer();
    expect.assertions(1);
    try {
      const command = new UploadAvatarCommand(
        '12345',
        'name',
        'encoding',
        '',
        buffer,
        '54321',
      );
      await uploadAvatarCommandHandler.execute(command);
    } catch (e) {
      expect((e as Error).message).toEqual('mimetype should not be empty');
    }
  });

  it('Upload avatar with invalid buffer', async () => {
    expect.assertions(1);
    try {
      const command = new UploadAvatarCommand(
        '12345',
        'name',
        'encoding',
        'image/png',
        null,
        '54321',
      );
      await uploadAvatarCommandHandler.execute(command);
    } catch (e) {
      expect((e as Error).message).toEqual('buffer should not be empty');
    }
  });

  it('Upload avatar with invalid avatar id', async () => {
    const buffer = await sharp(
      path.join(__dirname, '../../../test', 'test.png'),
    ).toBuffer();
    expect.assertions(1);
    try {
      const command = new UploadAvatarCommand(
        '12345',
        'name',
        'encoding',
        'image/png',
        buffer,
        '',
      );
      await uploadAvatarCommandHandler.execute(command);
    } catch (e) {
      expect((e as Error).message).toEqual('avatarId should not be empty');
    }
  });
});
