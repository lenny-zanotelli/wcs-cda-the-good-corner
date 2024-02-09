import { IsDate, IsInt, Length, Min } from "class-validator";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Category } from "./category.entity";
import { Tag } from "./tag.entity";
import { User } from "./user.entity";

@ObjectType()
@Entity()
export class Ad {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  @Length(3, 20)
  title: string;

  @Field(() => Number)
  @Column()
  @IsInt()
  @Min(0)
  price: number;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  owner: string;
  
  @Field()
  @Column()
  picture: string;

  @Field()
  @Column()
  location: string;

  @Field()
  @CreateDateColumn()
  @IsDate()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  @IsDate()
  updatedAt: Date;

  // One Ad has only 1 category
  // A category can contain multiple ads
  // ManyToOne relationship (many adds one category)
  @Field(() => Category)
  @ManyToOne(() => Category, (category) => category.ads, {
    nullable: false,
    onDelete: "CASCADE"
  }) 
  category: Category;

   // An ad can have multiple tags
  // A tag can have multiple ads
  @Field(() => [Tag], { nullable: true })
  @ManyToMany(() => Tag, (tag) => tag.ads, {
    cascade: ["insert", "update"]
  })
  @JoinTable()
  tags: Tag[];

  // An ad can have ONLY one owner
  // A user can have MULTIPLE ads
  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.ads)
  user: User;
}

@InputType()
export class PartialCategoryInput {
  @Field()
  id: string;
}

@InputType()
export class CreateAdInput {
  @Field()
  title: string;
  @Field()
  price: number;
  @Field()
  description: string;
  @Field()
  picture: string;
  @Field()
  location: string;
  @Field()
  category: PartialCategoryInput;
  @Field(() => [String], { nullable: true})
  tags?: [string];

}

@InputType()
export class UpdateAdInput {
  @Field({ nullable: true })
  title?: string;
  @Field({ nullable: true })
  price?: number;
  @Field({ nullable: true })
  description?: string;
  @Field({ nullable: true })
  picture?: string;
  @Field({ nullable: true })
  location?: string;
  @Field({ nullable: true})
  category?: PartialCategoryInput;
  @Field(() => [String], { nullable: true })
  tags?: [string];
}
