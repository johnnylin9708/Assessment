import { ApiResponse } from "./ApiResponse";

export interface LoginResponse extends ApiResponse {
  userId?: string;
  userName?: string;
  accessToken?: string;
  refreshToken?: string;
}
