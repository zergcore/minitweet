import api from "./api";
import { UserProfileData } from "./types";

export const getUserProfile = async (
  username: string
): Promise<UserProfileData> => {
  const response = await fetch(`/api/users/${username}`);
  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }
  const data: UserProfileData = await response.json();
  return data;
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
