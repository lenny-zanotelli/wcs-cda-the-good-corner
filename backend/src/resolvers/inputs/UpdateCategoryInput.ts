import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateCategoryInput {
  @Field()
  @Length(2, 10)
  name: string;
}