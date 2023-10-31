import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ObjectType, Field, ID} from "type-graphql";
import { Category } from "./category";
import { Tag } from "./tag";
import { IsDate, IsInt, Length, Min } from "class-validator";

@Entity()
@ObjectType()
export class Ad extends BaseEntity{
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  @Length(3, 20)
  title: string;

  @Field(() => Number)
  @Column()
  @IsInt()
  @Min(0)
  price: number;

  @Field(() => String)
  @Column()
  description: string;

  @Field(() => String)
  @Column()
  owner: string;
  
  @Field(() => String)
  @Column()
  picture: string;

  @Field(() => String)
  @Column()
  location: string;

  @Field()
  @CreateDateColumn()
  @IsDate()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  // One Ad has only 1 category
  // A category can contain multiple ads
  // MamyToOne relationship (many adds one category)
  @ManyToOne(() => Category, (category) => category.ads, {
    onDelete: "SET NULL"}) 
  category: Category

   // An ad can have multiple tags
  // A tag can have multiple ads
  @ManyToMany(() => Tag, (tag) => tag.ads)
  @JoinTable()
  tags: Tag[];
}