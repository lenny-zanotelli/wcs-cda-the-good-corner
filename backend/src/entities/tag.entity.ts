import { Length } from "class-validator";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ad } from "./ad.entity";


@ObjectType()
@Entity()
export class Tag {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ unique: true })
  @Length(2, 10)
  name: string;

  @ManyToMany(() => Ad, (ad) => ad.tags)
  @Field(() => [Ad], { nullable: true})
  ads: Ad[]
}

// INPUT

@InputType()
export class CreateUpdateTagInput {
  @Field()
  name: string;
}
