import { 
  BaseEntity, 
  Column, 
  CreateDateColumn, 
  Entity, 
  JoinTable, 
  ManyToMany, 
  ManyToOne, 
  PrimaryGeneratedColumn, 
  UpdateDateColumn } from "typeorm";
import { ObjectType, Field, ID} from "type-graphql";
import { Category } from "./category";
import { Tag } from "./tag";
import { IsDate, IsInt, Length, Min } from "class-validator";

@ObjectType()
@Entity()
export class Ad extends BaseEntity{
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  @Length(3, 20)
  title: string;

  @Field()
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
  @Field(() => Category, { nullable: true})
  @ManyToOne(() => Category, (category) => category.ads, {
    onDelete: "SET NULL"
  }) 
  category: Category

   // An ad can have multiple tags
  // A tag can have multiple ads
  @JoinTable()
  @ManyToMany(() => Tag, (tag) => tag.ads)
  tags: Tag[];
}