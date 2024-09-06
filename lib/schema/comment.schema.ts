import { IsString, MinLength } from "class-validator";

export class CommentField {
  @IsString()
  @MinLength(1)
  comment_text: string;
}
