import api from "./api";
import { UserProfileData } from "./types";

export const getUserProfile = async (username: string) => {
  const response = await api.get(`/users/profile/${username}`);
  return response.data;
};

export const updateUserProfile = async (
  profileData: UserProfileData
): Promise<UserProfileData> => {
  const response = await api.put<UserProfileData>(
    "/users/profile",
    profileData
  );
  return response.data;
};
