import { Injectable } from '@nestjs/common';
import { ImageUpload } from '../../domain/models/imageUpload';

@Injectable()
export abstract class MediaStore {
  abstract uploadImage(image: ImageUpload): Promise<string>;
  abstract deleteImage(id: string): Promise<void>;
  abstract updateImage(image: ImageUpload): Promise<string>;
}
