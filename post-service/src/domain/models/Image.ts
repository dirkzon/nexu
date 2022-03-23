import {IsInt, Min, Max} from "class-validator"

const MIN_SIZE = 640;
const MAX_SIZE = 1080;

export class Image {
  id: string;
  url: string;
  @IsInt()
  @Min(MIN_SIZE)
  @Max(MAX_SIZE)
  height: number;
  @IsInt()
  @Min(MIN_SIZE)
  @Max(MAX_SIZE)
  width: number;
}
