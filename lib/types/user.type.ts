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
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  country: string;
  state: string;
  dob: string;
  bio: string;
  verified: boolean;
  gender: string;
  website: string;
  avatar: BucketImage | null;
  cover: BucketImage | null;
  followers_count: number;
  follwing_count: number;
}
