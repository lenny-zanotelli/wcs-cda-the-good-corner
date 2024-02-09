import { Ad, CreateAdInput } from "../entities/ad.entity";
import { Category } from "../entities/category.entity";
import { Tag } from "../entities/tag.entity";
import { Like, Repository } from "typeorm";
import CategoryService from "./category.service";
import { TagService } from "./tag.service";
import datasource from "../../config/datasource";

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
    const category = await new CategoryService().find(data.category.id);
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

  async update(id: string, { tags, ...data }: Partial<CreateAdInput>) {
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
  }

  async delete(id: string) {
    const ad = await this.find(id);
    await this.db.remove(ad);
    return await this.list();
  }
} 