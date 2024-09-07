import { IsNotEmpty, IsString } from "class-validator";

export class NameField {
  @IsString()
  @IsNotEmpty()
  stream_name: string;
}
