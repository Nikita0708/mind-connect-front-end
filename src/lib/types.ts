export type authType = {
  isAuth: boolean;
  captchaUrl: null | string;
  usersData: usersDataType;
  tokenIsValid: boolean | null;
  isPending: boolean;
  googleUrl: null | string;
};

export type usersDataType = {
  email: string;
  firstName: string;
  lastName: string;
  number: number;
  image: string;
};
