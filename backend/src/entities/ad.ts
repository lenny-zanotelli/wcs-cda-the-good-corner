import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "./category";
import { Tag } from "./tag";
import { IsDate, IsInt, Length, Min } from "class-validator";

@Entity()
export class Ad extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(3, 20)
  title: string;

  @Column()
  @IsInt()
  @Min(0)
  price: number;

  @Column()
  description: string;

  @Column()
  owner: string;
  
  @Column()
  picture: string;

  @Column()
  location: string;

  @CreateDateColumn()
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // One Ad has only 1 category
  // A category can contain multiple ads
  // MamyToOne relationship (many adds one category)
  @ManyToOne(() => Category, (category) => category.ads) 
  category: Category

   // An ad can have multiple tags
  // A tag can have multiple ads
  @ManyToMany(() => Tag, (tag) => tag.ads)
  @JoinTable()
  tags: Tag[];
}