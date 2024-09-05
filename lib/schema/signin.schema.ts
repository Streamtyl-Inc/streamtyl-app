import { IsNotEmpty, IsString } from "class-validator";

export class LoginFields {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
