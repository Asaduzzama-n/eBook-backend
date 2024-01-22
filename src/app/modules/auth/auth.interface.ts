export type IUserLogin = {
  email: string;
  password: string;
};

export type IUserLoginResponse = {
  userData: any;
  accessToken: string;
  refreshToken?: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};
