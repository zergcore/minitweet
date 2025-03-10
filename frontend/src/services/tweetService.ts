import api from "./api";
import { Tweet } from "./types";

export const getAllTweets = async (): Promise<Tweet[]> => {
  const response = await api.get<Tweet[]>("/tweets");
  return response.data;
};

export const getUserTweets = async (userId: string): Promise<Tweet[]> => {
  const response = await api.get<Tweet[]>(`/tweets/user/${userId}`);
  return response.data;
};

export const createTweet = async (tweetData: {
  content: string;
}): Promise<Tweet> => {
  const response = await api.post<Tweet>("/tweets", tweetData);
  return response.data;
};

export const updateTweet = async (
  id: string,
  tweetData: { content: string }
): Promise<Tweet> => {
  const response = await api.put<Tweet>(`/tweets/${id}`, tweetData);
  return response.data;
};

export const deleteTweet = async (id: string) => {
  await api.delete(`/tweets/${id}`);
  return id;
};
