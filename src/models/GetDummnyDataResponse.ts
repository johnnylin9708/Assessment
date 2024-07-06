import { ApiResponse } from "./ApiResponse";

export interface GetDummnyDataResponse extends ApiResponse {
  register?: {
    username: string;
    password: string;
    avatar: string;
  };
  login?: {
    username: string;
    password: string;
  };
  changePassword?: {
    username: string;
    oldPassword: string;
    newPassword: string;
  };
  validateRefreshToken?: {
    refreshToken: string;
  };
}
