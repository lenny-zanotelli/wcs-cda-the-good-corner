import { BaseEntity, BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field, ID} from "type-graphql";
import { Ad } from "./ad";
import * as argon2 from "argon2";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @BeforeInsert()
  protected async hashPassword() {
    this.password = await argon2.hash(this.password);
  }
  
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  password: string;

  @OneToMany(() => Ad, (ads) => ads.owner)
  @Field(() => [Ad], { nullable: true})
  ads: Ad[];

}