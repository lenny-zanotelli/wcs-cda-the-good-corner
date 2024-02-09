import { Ad, CreateAdInput } from "../entities/ad.entity";
import { Category } from "../entities/category.entity";
import { Tag } from "../entities/tag.entity";
import { Like, Repository } from "typeorm";
import CategoryService from "./category.service";
import { TagService } from "./tag.service";
import datasource from "../../config/datasource";
import { validate } from "class-validator";

export default class AdService {
  db: Repository<Ad>;
  dbCategory: Repository<Category>;
  constructor() {
    this.db = datasource.getRepository(Ad);
    this.dbCategory = datasource.getRepository(Category);
  }

  async create(data: CreateAdInput) {
    const errors = await validate(data);
    if (errors.length > 0) {
      throw new Error('Invalid input data')
    }
    try {
      const category = await new CategoryService().find(data.category.id);
      console.log(category);
      let tags: Tag[] = [];
      if (data?.tags?.length) {
        tags = await new TagService().list(data.tags);
      }
      console.log('tag:', tags);
      const newAd = this.db.save({ ...data, category, tags });
      
      return newAd; 
    } catch (error) {
      throw new Error(`Failed to create ad :${error.message}`);
    }
  }

  async list(search?: string) {
    return this.db.find({
      relations: { category: true, tags: true },
      where: search ?
      [
        { title: Like(`%${search}%`) },
        { category: { name: Like(`%${search}%`)} },
      ] : 
      undefined,
    });
  }

  async find(id: string) {
    const ad = await this.db.findOne({
      relations: { tags: true, category: true },
      where: { id },
    });
    if (!ad) {
      throw new Error('Ad doesnt exist.');
    }
    return ad;
  }

  async update(id: string, { tags, ...data }: Partial<CreateAdInput>) {
    const errors = await validate(data);
    if (errors.length > 0) {
      throw new Error('Invalid input data')
    }
    try {
      const ad = await this.find(id);
      const newInfos = this.db.merge(ad, data);
      let listTags: Tag[] = [];
      if (tags?.length) {
        listTags = await new TagService().list(tags);
      }
  
      const result = listTags.reduce((acc, item) => {
        return acc.includes(item) ? acc: [...acc, item];
      }, [] as Tag[]);
      newInfos.tags = result;
  
      return await this.db.save(newInfos);
    } catch (error) {
      throw new Error(`Failed to update ad :${error.message}`);      
    }
  }

  async delete(id: string) {
    const ad = await this.find(id);
    await this.db.remove(ad);
    return await this.list();
  }
} 