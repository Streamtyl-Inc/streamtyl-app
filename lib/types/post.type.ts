import { Meta } from "./meta.type";
import { AuthUser } from "./auth.type";
import { BucketImage } from "./user.type";

export type PostData = {
  auth: AuthUser;
  comments_count: number;
  created_at: string;
  id: string;
  like: {
    created_at: string;
    id: string;
    updated_at: string;
  };
  is_edited: boolean;
  is_pinned: boolean;
  likes_count: number;
  post_text: string;
  media: BucketImage[];
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
