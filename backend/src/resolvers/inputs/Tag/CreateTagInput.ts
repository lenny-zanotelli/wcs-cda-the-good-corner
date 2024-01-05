import { Field, InputType } from "type-graphql";


@InputType()
export class CreateTagInput {
  @Field()
  name: string;
}