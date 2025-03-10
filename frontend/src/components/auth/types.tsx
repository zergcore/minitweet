interface LoginResponse {
  id: number;
  username: string;
  email: string;
  token: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  id: number;
  username: string;
  email: string;
  token: string;
}

export type { LoginResponse, LoginData, RegisterData, RegisterResponse };
