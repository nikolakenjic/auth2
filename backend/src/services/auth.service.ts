import UserModel from '../models/user.model';

export type CreateAccountParams = {
  email: string;
  password: string;
};
export const createAccount = async (data: CreateAccountParams) => {
  //  verify existing user does not exist
  const existingUser = await UserModel.exists({ email: data.email });

  if (existingUser) throw new Error('User already exists');

  //  create user
  const user = await UserModel.create({
    email: data.email,
    password: data.password,
  });

  // create verification code
  // send verification email
  // create session
  // sign access token and refresh token
  // return user and tokens
};
