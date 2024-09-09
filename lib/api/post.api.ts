import { axiosConfig, axiosUploadConfig } from "./axios.config";
import { PostsType, Comments } from "../types/post.type";
import { nanoid } from "nanoid";

export const _createPost = async (post_text: string, imageFiles: string[]) => {
  const formData = new FormData();
  formData.append("post_text", post_text);

  // for (const file of Array.from(imageFiles)) {
  //   const imageFile = CropperService.base64StringtoFile(file, nanoid());
  //   formData.append("files", imageFile, imageFile.name);
  // }

  return await axiosConfig.post("/post", formData);
};

export const _getPosts = async (page?: number) => {
  return await axiosConfig.get<PostsType>(`/post?page=${page}`);
};

export const _getUserPosts = async (params: {
  page?: number;
  userId: string;
}) => {
  return await axiosConfig.get<PostsType>(
    `/post/${params.userId}/user?page=${params.page}`
  );
};
