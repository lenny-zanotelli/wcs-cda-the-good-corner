import { BaseEntity, BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ObjectType, Field, ID} from "type-graphql";
import { Ad } from "./ad";
import * as argon2 from "argon2";

export type UserRoleType = "admin" | "user";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @BeforeInsert()
  /*
    Diff entre private et protected
    https://stackoverflow.com/questions/36843357/typescript-difference-between-private-and-protected-variables
  */
  
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

  @Field()
  @Column({
    type: "enum",
    enum: ["admin", "user"],
    default: "user"
  })
  role: UserRoleType;

  @OneToMany(() => Ad, (ads) => ads.owner)
  @Field(() => [Ad], { nullable: true})
  ads: Ad[];

}