import { CqrsModule, EventBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { MediaStore } from '../ports/mediaStore';
import sharp from 'sharp';
import path from 'path';
import { UploadImageCommandHandler } from './upload-image.command.handler';
import { UploadImageCommand } from '../commands/upload-image.command';

describe('Update image command handler tests', () => {
  let mediaStore: MediaStore;
  let eventBusSpy: jest.SpyInstance;
  let uploadImageCommandHandler: UploadImageCommandHandler;

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

    uploadImageCommandHandler = new UploadImageCommandHandler(
      mediaStore,
      eventBus,
    );

    mediaStore.uploadImage = jest.fn(() => Promise.resolve('url'));
  });

  it('should exist', () => {
    expect(mediaStore).toBeDefined();
    expect(UploadImageCommandHandler).toBeDefined();
  });

  it('Upload image with valid id', async () => {
    const buffer = await sharp(
      path.join(__dirname, '../../../test', 'test.png'),
    ).toBuffer();
    const command = new UploadImageCommand(
      '12345',
      'name',
      'encoding',
      'image/png',
      buffer,
    );
    await uploadImageCommandHandler.execute(command);
    expect(mediaStore.uploadImage).toHaveBeenCalledTimes(1);
    expect(eventBusSpy).toHaveBeenCalledTimes(1);
  });

  it('Upload image with invalid user id', async () => {
    const buffer = await sharp(
      path.join(__dirname, '../../../test', 'test.png'),
    ).toBuffer();
    expect.assertions(1);
    try {
      const command = new UploadImageCommand(
        '',
        'name',
        'encoding',
        'image/png',
        buffer,
      );
      await uploadImageCommandHandler.execute(command);
    } catch (e) {
      expect((e as Error).message).toEqual('postId should not be empty');
    }
  });

  it('Upload image with invalid name', async () => {
    const buffer = await sharp(
      path.join(__dirname, '../../../test', 'test.png'),
    ).toBuffer();
    expect.assertions(1);
    try {
      const command = new UploadImageCommand(
        '12345',
        '',
        'encoding',
        'image/png',
        buffer,
      );
      await uploadImageCommandHandler.execute(command);
    } catch (e) {
      expect((e as Error).message).toEqual('name should not be empty');
    }
  });

  it('Upload image with invalid encoding', async () => {
    const buffer = await sharp(
      path.join(__dirname, '../../../test', 'test.png'),
    ).toBuffer();
    expect.assertions(1);
    try {
      const command = new UploadImageCommand(
        '12345',
        'name',
        '',
        'image/png',
        buffer,
      );
      await uploadImageCommandHandler.execute(command);
    } catch (e) {
      expect((e as Error).message).toEqual('encoding should not be empty');
    }
  });

  it('Upload image with invalid mimetype', async () => {
    const buffer = await sharp(
      path.join(__dirname, '../../../test', 'test.png'),
    ).toBuffer();
    expect.assertions(1);
    try {
      const command = new UploadImageCommand(
        '12345',
        'name',
        'encoding',
        '',
        buffer,
      );
      await uploadImageCommandHandler.execute(command);
    } catch (e) {
      expect((e as Error).message).toEqual('mimetype should not be empty');
    }
  });

  it('Upload image with invalid buffer', async () => {
    expect.assertions(1);
    try {
      const command = new UploadImageCommand(
        '12345',
        'name',
        'encoding',
        'image/png',
        null,
      );
      await uploadImageCommandHandler.execute(command);
    } catch (e) {
      expect((e as Error).message).toEqual('buffer should not be empty');
    }
  });
});
