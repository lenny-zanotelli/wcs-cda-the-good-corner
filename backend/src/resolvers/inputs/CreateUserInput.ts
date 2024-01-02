import { User } from "../../entities/user";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateUserInput implements Partial<User> {
  @Field()
  email: string

  @Field()
  password: string;

}