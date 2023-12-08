export type UserResponse = {
  status: string,
  message: string,
  data: {
    username: string,
    email: string,
    role: string,
    token: string
  }
}