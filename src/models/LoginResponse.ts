import { ApiResponse } from "./ApiResponse";

export interface LoginResponse extends ApiResponse {
  userId?: string;
  accessToken?: string;
  refreshToken?: string;
}
