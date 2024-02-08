import datasource  from "config/datasource";
import { Ad, CreateAdInput } from "../entities/ad.entity";
import { Category } from "../entities/category.entity";
import { Tag } from "../entities/tag.entity";
import { Like, Repository } from "typeorm";
import CategoryService from "./category.service";
import { TagService } from "./tag.service";

export default class AdService {
  db: Repository<Ad>;
  dbCategory: Repository<Category>;
  dbTags: Repository<Tag>;
  constructor() {
    this.db = datasource.getRepository(Ad);
    this.dbCategory = datasource.getRepository(Category);
    this.dbTags = datasource.getRepository(Tag);
  }

  async create(data: CreateAdInput) {
    const category = await new CategoryService().find(data.category);
    let tags: Tag[] = [];
    if (data?.tags?.length) {
      tags = await new TagService().list(data.tags);
    }
    const newAd = this.db.create({ ...data, category, tags });
      return await this.db.save(newAd);
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
} 