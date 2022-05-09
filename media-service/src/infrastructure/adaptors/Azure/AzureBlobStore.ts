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

  async uploadImage(image: ImageUpload): Promise<boolean> {
    const file: UploadedFileMetadata = {
      fieldname: image.name,
      originalname: image.id,
      size: image.buffer.byteLength.toString(),
      encoding: image.encoding,
      mimetype: image.mimetype,
      buffer: image.buffer,
    };
    const test = await this.azureStorage.upload(file);
    console.log(test);
    return true;
  }
}
