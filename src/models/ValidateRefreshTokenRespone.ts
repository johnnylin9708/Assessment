import { ApiResponse } from "./ApiResponse";

export interface ValidateRefreshTokenResponse extends ApiResponse {
  accessToken?: string;
}
