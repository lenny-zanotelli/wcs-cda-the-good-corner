import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category";

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

  @Column()
  createdAt: string;

  // One Ad has only 1 category
  // A category can contain multiple ads
  // MamyToOne relationship (many adds one category)
  @ManyToOne(() => Category, (category) => category.ads) 
  category: Category
}