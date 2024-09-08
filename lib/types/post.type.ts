import { Meta } from "./meta.type";
import { AuthProfile, AuthUser } from "./auth.type";
import { BucketImage } from "./user.type";

export type PostData = {
  user: AuthProfile;
  created_at: string;
  id: string;
  post_text: string;
  updated_at: string;
};

export type PostsType = {
  data: PostData[];
  links: {
    current: string;
  };
  meta: Meta;
};

export type Comment = {
  id: string;
  created_at: string;
  updated_at: string;
  comment_text: string;
  likes_count: number;
  auth: AuthUser;
};

export type Comments = {
  data: Comment[];
  meta: Meta;
};
