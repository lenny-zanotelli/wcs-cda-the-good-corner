import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ad } from "./ad";
import { Length } from "class-validator";

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(2, 10)
  name: string;

  // A category can contain multiple ads
  @OneToMany(() => Ad, (ads) => ads.category)
  ads: Ad[];

}