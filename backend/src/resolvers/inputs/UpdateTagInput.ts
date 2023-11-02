import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateTagInput {
  @Field()
  @Length(2, 10)
  name: string;
}