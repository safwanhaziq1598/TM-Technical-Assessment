export interface User{
  username: string;
  password: string;
}

export interface UserLoginResponse {
  success: boolean;
  token: string;
  tokeExpiry: string;
}
