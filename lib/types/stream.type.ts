import { AuthUser } from "./auth.type";
import { BucketImage } from "./user.type";

export type StreamComment = {
  id: string;
  created_at: string;
  updated_at: string;
  comment_text: string;
  likes_count: number;
  auth: AuthUser;
};

export type UserStream = {
  auth: AuthUser;
  comment_count: number;
  created_at: string;
  creator_name: string;
  id: string;
  playback_id: string;
  stream_id: string;
  stream_key: string;
  stream_name: string;
  streaming_time: string;
  pastel_result_id: string;
  thumbnail: BucketImage;
  updated_at: string;
  watch_count: number;
};
