export type BucketImage = {
  id: string;
  created_at: string;
  updated_at: string;
  url: string;
  key: string;
  bucket: string;
  type: string;
};

export type Wallet = {
  id: string;
  wallet_address: string;
  created_at: string;
  updated_at: string;
};

export interface Profile {
  id: string | null;
  firstname: string | null;
  lastname: string | null;
  username: string | null;
  country: string | null;
  state: string | null;
  dob: string | null;
  bio: string | null;
  verified: boolean;
  gender: string | null;
  website: string | null;
  avatar: BucketImage | null;
  cover: BucketImage | null;
  followers_count: number;
  follwing_count: number;
}
