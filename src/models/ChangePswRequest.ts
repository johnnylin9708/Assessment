export interface ChangePswRequest {
  accessToken: string;
  username: string;
  oldPassword: string;
  newPassword: string;
}
