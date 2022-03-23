import { Image } from './Image';
import { IsDate, IsArray, ValidateNested, ArrayMinSize, ArrayMaxSize, IsString, Length } from 'class-validator';

export class Post {
  id: string;
  @IsString()
  @Length(1, 100)
  description: string;
  @IsDate()
  createdAt: Date;
  createdBy: string;
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  images: Image[];
}
