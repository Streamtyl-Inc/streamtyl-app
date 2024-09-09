import { axiosConfig, axiosUploadConfig } from "./axios.config";
import { Stream } from "@livepeer/react";
import { Profile } from "../types/user.type";
import CropperService from "../../utils/cropper";
import {
  CreateStream,
  StreamCommentsResponse,
  UserStream,
  UserStreamsResponse,
} from "../types/stream.type";
import { livepeerService } from "@/utils/livepeer-client";
import { CommentField } from "../schema/comment.schema";
import { Client } from "@xmtp/xmtp-js";
import { Wallet } from "ethers";

export const _createStream = async (payload: {
  data: Stream;
  user: Profile;
  file: string;
}) => {
  var formData = new FormData();
  const today = new Date();

  const imageFile = CropperService.base64StringtoFile(
    payload.file,
    Math.random().toString()
  );

  formData.append("stream_key", payload.data.streamKey);
  formData.append("stream_id", payload.data.id);
  formData.append(
    "creator_name",
    String(`${payload.user.firstname} ${payload.user.lastname}`)
  );
  formData.append("stream_name", payload.data.name);
  formData.append("playback_id", payload.data.playbackId);
  formData.append("streaming_time", today.toISOString());
  formData.append("thumbnail", imageFile, imageFile.name);

  return await axiosUploadConfig.post<CreateStream>("/stream", formData);
};

export const _getStream = async (streamID: string) =>
  await axiosConfig.get<UserStream>(`/stream/${streamID}`);

export const _getLivepeerRecordedStream = async (id: string) =>
  await livepeerService.session.getRecorded(id);

export const _getUserStreams = async () =>
  await axiosConfig.get<UserStreamsResponse>("/auth/stream");

export const _getStreams = async (page: number) =>
  await axiosConfig.get<UserStreamsResponse>(`/stream?page=${page}&limit=8`);

export const _watchStream = async (streamID: string) =>
  await axiosConfig.patch(`/stream/${streamID}/watch`);

export const _getStreamComments = async (id: string) =>
  await axiosConfig.get<StreamCommentsResponse>(`/stream/${id}/comment`);

export const _createComment = async (payload: {
  id: string;
  data: CommentField;
}) => await axiosConfig.post(`/stream/${payload.id}/comment`, payload.data);

export const _updatePastelId = async (payload: {
  data: { pastel_result_id: string };
  stream_id: string;
}) => await axiosConfig.patch(`/stream/${payload.stream_id}`, payload.data);

export const _getPlayback = async (playback_id: string) =>
  await livepeerService.playback.get(playback_id);
