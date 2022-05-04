import { IQuery } from '@nestjs/cqrs';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { Pagination } from '../../domain/models/Pagination';

export class SearchUserQuery implements IQuery {
  @IsInt()
  @Max(50)
  @Min(0)
  first: number;
  @IsInt()
  @Min(0)
  from: number;
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  query: string;

  constructor(pagination: Pagination, query: string) {
    this.first = pagination.first;
    this.from = pagination.from;
    this.query = query;
  }
}
