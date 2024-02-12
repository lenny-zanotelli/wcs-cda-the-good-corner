import * as argon2 from "argon2";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ad } from "./ad.entity";
import { IsUUID } from "class-validator";

export type UserRoleType = "admin" | "user";

@ObjectType()
@Entity()
export class User {
  @BeforeInsert()
  /*
    Diff entre private et protected
    https://stackoverflow.com/questions/36843357/typescript-difference-between-private-and-protected-variables
    */
  
  protected async hashPassword() {
    this.password = await argon2.hash(this.password);
  }
  
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @Field()
  @Column({ unique: true })
  email: string;

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
  @Field(() => [Ad], { nullable: true })
  ads: Ad[];

}

@ObjectType()
export class UserInfo {
  @Field()
  isLoggedIn: boolean;
  @Field({ nullable: true })
  email: string;
  @Field({ nullable: true })
  role: string;
}


@ObjectType()
export class UserWithoutPassword implements Omit<User, "password" | "ads"> {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  role: UserRoleType;
}

// INPUT
@InputType()
export class UserInput implements Partial<User> {
  @Field()
  @Column({ unique: true })
  email: string
  @Field()
  password: string;
}

