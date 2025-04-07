export type UserType = {
  name: string;
  email: string;
  password: string;
};

export type LoginUserType = Pick<UserType, "email" | "password">;
