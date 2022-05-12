import {
  AzureStorageService,
  UploadedFileMetadata,
} from '@nestjs/azure-storage';
import { Injectable } from '@nestjs/common';
import { MediaStore } from '../../../application/ports/mediaStore';
import { ImageUpload } from '../../../domain/models/imageUpload';

@Injectable()
export class AzureBlobStore implements MediaStore {
  constructor(private readonly azureStorage: AzureStorageService) {}

  async updateImage(image: ImageUpload): Promise<string> {
    const file: UploadedFileMetadata = {
      fieldname: image.name,
      originalname: image.id,
      size: image.buffer.byteLength.toString(),
      encoding: image.encoding,
      mimetype: image.mimetype,
      buffer: image.buffer,
    };
    return await this.azureStorage.upload(file);
  }

  deleteImage(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async uploadImage(image: ImageUpload): Promise<string> {
    const file: UploadedFileMetadata = {
      fieldname: image.name,
      originalname: image.id,
      size: image.buffer.byteLength.toString(),
      encoding: image.encoding,
      mimetype: image.mimetype,
      buffer: image.buffer,
    };
    return await this.azureStorage.upload(file);
  }
}
