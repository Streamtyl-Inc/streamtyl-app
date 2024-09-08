import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginFields {
  @IsEmail({}, { message: "invalid email address" })
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
