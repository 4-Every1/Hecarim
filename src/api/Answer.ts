import { AxiosResponse } from "axios";
import uri from "constance/uri";
import { instance, noTokenInstance } from "utils/axios";

export interface VideoAnswer {
  id: number;
  title: string;
  user_id: number;
  profile: string;
  video_url: string;
  created_at: string;
  like_cnt: number;
  is_adoption: number;
  is_mine: boolean;
  is_like: false;
}

export interface getVideoAnswerListResponse {
  data: VideoAnswer[];
}

export const getVideoAnswerList = async (
  questionId: number,
  page: number,
  size: number
) => {
  return await noTokenInstance.get<getVideoAnswerListResponse>(
    `${uri.videoAnswer}/${questionId}`,
    {
      params: { page, size },
    }
  );
};

export const adoptionVideoAnswer = async (videoId: number) => {
  return await instance.put(`${uri.videoAnswerAdoption}/${videoId}`);
};

export const deleteVideoAnswer = async (videoId: number) => {
  return await instance.delete(`${uri.videoAnswer}/${videoId}`);
};

interface getVideoAnswerDetailResponse {
  data: VideoAnswer;
}

export const getVideoAnswerDetail = async (videoId: number) => {
  return await noTokenInstance.get<getVideoAnswerDetailResponse>(
    `${uri.videoAnswerDetail}/${videoId}`
  );
};
