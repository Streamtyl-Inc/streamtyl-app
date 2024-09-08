import { AuthProfile, AuthUser } from "./auth.type";
import { Meta } from "./meta.type";
import { BucketImage, Profile } from "./user.type";

export type StreamComment = {
  id: string;
  created_at: string;
  updated_at: string;
  comment_text: string;
  likes_count: number;
  user: AuthProfile;
};

export type UserStream = {
  user: Profile;
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

export type CreateStream = {
  comment_count: number;
  created_at: string;
  creator_name: string;
  id: string;
  playback_id: string;
  recording_url: string;
  stream_key: string;
  stream_name: string;
  streaming_time: string;
  thumbnail: BucketImage;
  updated_at: string;
};

export type UserStreamsResponse = {
  data: UserStream[];
  links: {
    current: string;
  };
  meta: Meta;
};

export type StreamCommentsResponse = {
  data: StreamComment[];
  meta: Meta;
  links: { current: string };
};
