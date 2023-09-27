import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category";
import { Tag } from "./tag";

@Entity()
export class Ad extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
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
  createdAt: Date;

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