export type UserResponse = {
  status: string;
  message: string;
  data: {
    username: string;
    email: string;
    role: string;
    token: string;
  };
};

export type Token = {
  access: string;
  username: string;
  role: string;
};

export type User = {
  username: string;
  email: string | null | undefined;
  role: string;
} | undefined;
