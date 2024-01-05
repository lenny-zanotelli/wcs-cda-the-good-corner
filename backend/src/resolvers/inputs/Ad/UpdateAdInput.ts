import { IsInt, Length, Min } from "class-validator";
import { Field, InputType, Int } from "type-graphql";

@InputType()
export class UpdateAdInput {
  @Field({ nullable: true })
  @Length(3, 20)
  title?: string;

  @Field({ nullable: true })
  @IsInt()
  @Min(0)
  price?: number;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  owner?: string;
  
  @Field({ nullable: true })
  picture?: string;

  @Field({ nullable: true })
  location?: string;

  @Field({ nullable: true})
  category?: number

  @Field(() => [Int], { nullable: true })
  tags?: number[]
}