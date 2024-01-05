import { User } from "../entities/user.entity";
import { Arg, Mutation, Ctx, Query, Resolver } from "type-graphql";
import { CreateUserInput } from "./inputs/User/CreateUserInput";
import { LoginUserInput } from "./inputs/User/LoginUserInput";
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";
import Cookies from "cookies";
import { JWTContext } from "src";

// TODO : creer des services pour l' injection dependance

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async getAllUsers() {
    const result = User.find();
    return result;
  }

  @Query(() => User)
  getUserById(@Arg("id") id: number) {
    return User.findOneBy({ id })
  }

  @Query(() => String)
  async login(@Arg("userLogin") UserInput: LoginUserInput, @Ctx() ctx: JWTContext) {
    try {

      const user = await User.findOneByOrFail({ email: UserInput.email });
      if (!user) { 
        throw new Error ("invalid credentials");
      }
      const isPasswordValid = await argon2.verify(user.password, UserInput.password);

      if (isPasswordValid) {
        const token = jwt.sign({
          email: user.email,
          role: user.role,
          }, 
          'secret',
          { 
          algorithm: 'HS256', 
          expiresIn: '1h'
          }
        );
        console.log("token", token);
        
        let cookies = new Cookies(ctx.req, ctx.res);
        cookies.set("token", token, { httpOnly: true })
        console.log("token user resolver", ctx.req.headers);
        return token;

      } else {
          throw new Error("invalid password");
        }
      } catch (err) {
        console.log("err", err);
        return "invalid credentials";
    }
  }

  @Query(() => String)
    async logout(@Ctx() ctx: JWTContext) {
      if (ctx.user) {
        let cookies = new Cookies(ctx.req, ctx.res);
        console.log("cookies:", cookies);
        cookies.set("token");
        return "Disconnected";
      }
      return;
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