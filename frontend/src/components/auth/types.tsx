interface LoginResponse {
  id: number;
  username: string;
  email: string;
  token: string;
}

interface LoginData {
  username: string;
  password: string;
}

export type { LoginResponse, LoginData };
