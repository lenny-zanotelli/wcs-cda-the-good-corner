import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field, ID} from "type-graphql";
import { Ad } from "./ad";


@Entity()
@ObjectType()
export class Tag extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field(() => String)
  @Column()
  name: string;

  @ManyToMany(() => Ad, (ad) => ad.tags)
  ads: Ad[]
}