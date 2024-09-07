import { LoginFields } from "../schema/signin.schema";
import { SignupFields } from "../schema/signup.schema";
import { Profile } from "../types/user.type";
import { AuthProfile } from "../types/auth.type";
import { axiosConfig } from "./axios.config";

export const _signup = async (data: SignupFields) =>
  await axiosConfig.post("/auth/signup", data);

export const _login = async (data: LoginFields) =>
  await axiosConfig.post("/auth/login", data);

export const _getProfile = async () =>
  await axiosConfig.get<Profile>("/auth/profile");

export const _getAuthProfile = async () =>
  await axiosConfig.get<AuthProfile>("/auth/auth-credentials");
