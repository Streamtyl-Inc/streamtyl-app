import { axiosConfig, axiosUploadConfig } from "./axios.config";
import { PostsType, Comments } from "../types/post.type";
import CropperService from "../../utils/cropper";
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

export const _editPost = async (payload: {
  post_text: string;
  post_id: string;
}) =>
  await axiosConfig.patch(`/post/${payload.post_id}`, {
    post_text: payload.post_text,
  });

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

export const _likePost = async (postId: string) => {
  return await axiosConfig.post(`/post/${postId}/like`);
};

export const _deletePost = async (postId: string) => {
  return await axiosConfig.delete(`/post/${postId}`);
};

export const _verifyLike = async (postId: string) => {
  return await axiosConfig.get(`/post/${postId}/verify-like`);
};

export const _unlikePost = async (params: {
  postId: string;
  likeId: string;
}) => {
  return await axiosConfig.delete(
    `/post/${params.postId}/unlike/${params.likeId}`
  );
};

export const _pinPost = async (postId: string) =>
  await axiosConfig.patch(`/post/${postId}/pin`);

export const _unpinPost = async (postId: string) =>
  await axiosConfig.patch(`/post/${postId}/unpin`);

export const _postComment = async (params: {
  postId: string;
  data: { comment_text: string };
}) => {
  return await axiosConfig.post(`/post/${params.postId}/comment`, params.data);
};

export const _getPostComments = async (postId: string, page?: number) => {
  return await axiosConfig.get<Comments>(
    `/post/${postId}/comment?page=${page}`
  );
};

export const _likeComment = async (commentId: string) => {
  return await axiosConfig.post(`/comment/${commentId}/like`);
};

export const _verifyCommentLike = async (comment_id: string) => {
  return await axiosConfig.get(`/comment/${comment_id}/verify-like`);
};

export const _unlikeComment = async (params: {
  comment_id: string;
  like_id: string;
}) => {
  return await axiosConfig.delete(
    `/comment/${params.comment_id}/unlike/${params.like_id}`
  );
};
