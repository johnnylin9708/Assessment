import { ApiResponse } from "./ApiResponse";

export interface LoginResponse extends ApiResponse {
  accessToken?: string;
  refreshToken?: string;
}
