interface Profile {
  id: string;
  username: string;
  avatar?: string;
  bio?: string;
  createdAt: string;
}

interface ProfileHeaderProps {
  profile: Profile;
  tweetsCount: number;
}

interface ProfileEditModalProps {
  profile: Profile;
  show: boolean;
  onHide: () => void;
}

interface UpdateProfileError {
  response?: {
    data?: {
      message: string;
    };
  };
}

interface UpdateProfileData {
  bio: string;
  avatar: string;
}
export type {
  Profile,
  ProfileHeaderProps,
  ProfileEditModalProps,
  UpdateProfileError,
  UpdateProfileData,
};
