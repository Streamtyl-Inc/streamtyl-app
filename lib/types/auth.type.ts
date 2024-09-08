import { BucketImage, Wallet } from "./user.type";

export type AuthProfile = {
  avatar: BucketImage | null;
  firstname: string;
  id: string;
  lastname: string;
  username: string;
  verified: boolean;
  wallet: Wallet;
};

export type AuthUser = {
  id: string;
  profile: AuthProfile;
  username: string;
};
