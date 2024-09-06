import { AuthUser } from "./auth.type";

export type StreamComment = {
  id: string;
  created_at: string;
  updated_at: string;
  comment_text: string;
  likes_count: number;
  auth: AuthUser;
};
