import { IsInt, Length, Min } from "class-validator";
import { InputType, Field } from "type-graphql";

@InputType()
export class CreateAdInput {
  @Field()
  title: string;

  @Field()
  @IsInt()
  @Min(0)
  price: number;

  @Field()
  @Length(3, 20)
  description: string;

  @Field()
  owner: string;

  @Field()
  picture: string;

  @Field()
  location: string;
}