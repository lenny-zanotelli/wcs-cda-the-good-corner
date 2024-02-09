import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field, ID, InputType} from "type-graphql";

import { Ad } from "./ad.entity";
import { IsUUID, Length } from "class-validator";

@ObjectType()
@Entity()
export class Category {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @Field()
  @Column({ unique: true })
  @Length(2, 10)
  name: string;

  // A category can contain multiple ads
  @OneToMany(() => Ad, (ads) => ads.category)
  @Field(() => [Ad], { nullable: true})
  ads: Ad[];
}

@InputType()
export class CategoryInput {
  @Field()
  @Length(2, 10)
  name: string;
}
