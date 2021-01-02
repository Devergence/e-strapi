import { Resolver, Arg, Mutation } from "type-graphql";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'

import { UserModel } from "../entity/User";
import { AuthInput } from "../types/AuthInput";
import { UserResponce } from "../types/UserResponce";

@Resolver()
export class AuthResolver {
  @Mutation(() => UserResponce)
  async register(@Arg('input'){ email, password}: AuthInput): Promise<UserResponce> {
    // 1. Check for an exsisting email
    const existingUser = await UserModel.findOne({ email });

    if(existingUser) {
      throw new Error('Email already is use')
    }

    // 2. Magic with password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ email, password: hashedPassword});
    await user.save();

    // 3. store userId on the token payload
    const payload = {
      id: user.id
    }

    const token = jwt.sign(payload, process.env. SESSION_SECRET || "fsjgkdfjhdfh")

    return  { user, token }
  }

  @Mutation(() => UserResponce)
  async login(@Arg('input'){ email, password}: AuthInput): Promise<UserResponce> {
    // 1. Check for an exsisting email
    const existingUser = await UserModel.findOne({ email });

    if(!existingUser) {
      throw new Error('Invalid login')
    }

    // 2. Check if password is valid
    const valid = await bcrypt.compare(password, existingUser.password);

    if(!valid) {
      throw new Error('Invalid login')
    }

    // 3. store userId on the token payload
    const payload = {
      id: existingUser.id
    }

    const token = jwt.sign(payload, process.env. SESSION_SECRET || "fsjgkdfjhdfh")

    return  { user: existingUser, token }
  }
}
