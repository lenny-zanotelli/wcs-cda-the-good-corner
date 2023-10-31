import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field, ID} from "type-graphql";

import { Ad } from "./ad";
import { Length } from "class-validator";

@ObjectType()
@Entity()
export class Category extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  @Length(2, 10)
  name: string;

  // A category can contain multiple ads
  @OneToMany(() => Ad, (ads) => ads.category)
  ads: Ad[];

}