interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface Tweet {
  id: string;
  content: string;
  userId: string;
  user: {
    username: string;
    id: string;
  };
  createdAt: string;
}

interface UserProfileData {
  username?: string;
  email?: string;
  bio?: string;
}

export type { RegisterData, LoginCredentials, Tweet, UserProfileData };
