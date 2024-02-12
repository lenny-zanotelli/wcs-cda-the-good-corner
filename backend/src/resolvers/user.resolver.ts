import { User, UserInput, UserWithoutPassword } from "../entities/user.entity";
import UserService from "../services/user.service";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async getAllUsers() {
    return await new UserService().list();
  }

  @Mutation(() => UserWithoutPassword)
  async register(@Arg("infos") infos: UserInput) {
    console.log("Mes infos: ", infos);
    const user = await new UserService().find(infos.email);
    if (user) {
      throw new Error("This email is already taken");
    }
    const newUser = await new UserService().create(infos);
    return newUser;
  }
}
// @Resolver()
// export class UserResolver {
//   @Authorized("admin")
//   @Query(() => [User])
//   async getAllUsers() {
//     const result = User.find();
//     return result;
//   }

//   @Authorized("admin")
//   @Mutation(() => String)
//   async deleteUser(@Arg("id") id: number) {
//     const userToDelete = await User.findOneByOrFail({ id });
//     await userToDelete.remove();

//     return "user has been deleted";
//   }

//   @Query(() => User)
//   getUserById(@Arg("id") id: number) {
//     return User.findOneBy({ id })
//   }

//   @Query(() => String)
//   async login(@Arg("userLogin") UserInput: LoginUserInput, @Ctx() ctx: JWTContext) {
//     try {

//       const user = await User.findOneByOrFail({ email: UserInput.email });
//       if (!user) { 
//         throw new Error ("invalid credentials");
//       }
//       const isPasswordValid = await argon2.verify(user.password, UserInput.password);

//       if (isPasswordValid) {
//         const token = jwt.sign({
//           email: user.email,
//           role: user.role,
//           }, 
//           'secret',
//           { 
//           algorithm: 'HS256', 
//           expiresIn: '1h'
//           }
//         );
//         console.log("token", token);
        
//         let cookies = new Cookies(ctx.req, ctx.res);
//         cookies.set("token", token, { httpOnly: true })
//         console.log("token user resolver", ctx.req.headers);
//         return token;

//       } else {
//           throw new Error("invalid password");
//         }
//       } catch (err) {
//         console.log("err", err);
//         return "invalid credentials";
//     }
//   }

//   @Query(() => String)
//     async logout(@Ctx() ctx: JWTContext) {
//       if (ctx.user) {
//         let cookies = new Cookies(ctx.req, ctx.res);
//         console.log("cookies:", cookies);
//         cookies.set("token");
//         return "Disconnected";
//       }
//       return;
//     }
  

//   @Mutation(() => User)
//   async register(@Arg("newUser") UserInput: CreateUserInput) {
//     try {
//       const newUser = User.create({...UserInput});
//       await newUser.save();
//       return newUser;
      
//     } catch (error) {
//       console.log(error); 
//       return "Create User has been blocked"
      
//     }
//   }

//   @Query(() => UserInfo)
//   async whoAmI(@Ctx() ctx: JWTContext) {
//     if (ctx.user) {
//       if (ctx.user.email !== undefined) {
//         return { ...ctx.user, isLoggedIn: true };
//       } else {
//         return { isLoggedIn: false}
//       }
//     }
//     return { isLoggedIn: false }
//   }
