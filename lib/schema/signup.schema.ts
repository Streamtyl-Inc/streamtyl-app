import { IsEmail, IsString, Length, Matches } from "class-validator";

export class SignupFields {
  @Length(3, 16)
  @Matches(/^(?!.\.\.)(?!.\.$)[^\W][\w.]{0,29}$/, {
    message: "invalid username",
  })
  username: string;

  @IsEmail({}, { message: "invalid email address" })
  email: string;

  @IsString()
  @Length(8, 15)
  password: string;
}
