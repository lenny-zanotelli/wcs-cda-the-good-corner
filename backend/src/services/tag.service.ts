import { validate } from "class-validator";
import datasource from "../../config/datasource";
import { Tag, TagInput } from "../entities/tag.entity";
import { In, Repository } from "typeorm";

export class TagService {
  db: Repository<Tag>;
  constructor() {
    this.db = datasource.getRepository(Tag);
  }

  async create(data: TagInput) {
    const errors = await validate(data);
    if (errors.length > 0) {
      throw new Error('Invalid input data')
    }
    try {
      const newTag = this.db.create(data);
      const savedTag = this.db.save(newTag);

      return savedTag;
    } catch (error) {
      throw new Error(`Failed to create tag :${error.message}`);
    }
  }

  async list(tagIds?: string[]) {
    return await this.db.find({
      where: {
        id: tagIds && tagIds.length > 0 ? In(tagIds.map((tagId) => +tagId)) : undefined,
      }
    });
  }

  async find(id: string) {
    const tag = await this.db.findOne({
      where: { id },
    });
    if (!tag) {
      throw new Error("This Tag doesnt exist");
    }
    return tag;
  }

  async update(id: string, data: Partial<Tag>) {
    const errors = await validate(data);
    if (errors.length > 0) {
      throw new Error('Invalid input data')
    }
    try {
      const tag = await this.find(id);
      const newInfos = this.db.merge(tag, data);
      
      return await this.db.save(newInfos); 
    } catch (error) {
      throw new Error(`Failed to update : ${error.message}`);
    }
  }
  
  async delete(id: string) {
    const tag = await this.find(id);
    await this.db.remove(tag);
    return await this.list();
  }
}