import { User } from "../entities/user";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { CreateUserInput } from "./inputs/CreateUserInput";
import { LoginUserInput } from "./inputs/LoginUserInput";
import * as argon2 from "argon2";

@Resolver()
export class UserResolver {
  @Query(() => User)
  getUserById(@Arg("id") id: number) {
    return User.findOneBy({ id })
  }

  @Query(() => User)
  async login(@Arg("userLogin") UserInput: LoginUserInput) {
    try {

      const user = await User.findOneByOrFail({ email: UserInput.email });

      if ((await argon2.verify(user.hashedPassword, UserInput.password)) === false) {
        throw new Error("invalid password");
        } else {
          return "correct credentials";
        }
      } catch (err) {
        console.log("err", err);
        return "invalid credentials";
    }
  }

  @Mutation(() => User)
  async createUser(@Arg("newUser") UserInput: CreateUserInput) {
    try {
      const newUser = new User();
      newUser.email = UserInput.email;
      newUser.hashedPassword = await argon2.hash(UserInput.password);
      await newUser.save();

      return newUser;
      
    } catch (error) {
      console.log(error); 
      return "Create User has been blocked"
      
    }
  }
}