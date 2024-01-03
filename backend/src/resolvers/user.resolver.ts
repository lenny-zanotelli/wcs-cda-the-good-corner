import { User } from "../entities/user";
import { Arg, Mutation, Ctx, Query, Resolver } from "type-graphql";
import { CreateUserInput } from "./inputs/CreateUserInput";
import { LoginUserInput } from "./inputs/LoginUserInput";
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";
import { JWTContext } from "..";
import Cookies from "cookies";


@Resolver()
export class UserResolver {
  @Query(() => User)
  getUserById(@Arg("id") id: number) {
    return User.findOneBy({ id })
  }

  @Query(() => String)
  async login(@Arg("userLogin") UserInput: LoginUserInput, @Ctx() ctx: JWTContext) {
    try {

      const user = await User.findOneByOrFail({ email: UserInput.email });
      if (!user) { throw new Error ("invalid credentials");}

      const isPasswordValid = await argon2.verify(user.password, UserInput.password);

      if (isPasswordValid === false) {
        throw new Error("invalid password");
        } else {
          const token = jwt.sign({
            email: user.email
            }, 'secret',
            { algorithm: 'HS256', 
            expiresIn: '1h'
            }
          );
          console.log('token', token);
          let cookies = new Cookies(ctx.req, ctx.res);
          cookies.set("Token", token, { httpOnly: true })
          return "correct credentials";
        }
      } catch (err) {
        console.log("err", err);
        return "invalid credentials";
    }
  }

  @Mutation(() => User)
  async register(@Arg("newUser") UserInput: CreateUserInput) {
    try {
      const newUser = User.create({...UserInput});
      await newUser.save();
      return newUser;
      
    } catch (error) {
      console.log(error); 
      return "Create User has been blocked"
      
    }
  }
}