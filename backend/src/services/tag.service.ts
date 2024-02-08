import datasource from "config/datasource";
import { Tag } from "../entities/tag.entity";
import { In, Repository } from "typeorm";

export class TagService {
  db: Repository<Tag>;
  constructor() {
    this.db = datasource.getRepository(Tag);
  }

  async list(tagIds?: string[]) {
    return await this.db.find({
      where: {
        id: tagIds && tagIds.length > 0 ? In(tagIds.map((tagId) => +tagId)) : undefined,
      }
    });
  }

}