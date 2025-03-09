interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

export type { RegisterData, LoginCredentials };
