import datasource from "../../config/datasource";
import { Category } from "../entities/category.entity";
import { Repository } from "typeorm";

export default class CategoryService {
  db: Repository<Category>
  constructor() {
    this.db = datasource.getRepository(Category);
  }
  async list() {
    return await this.db.find({ relations: { ads: true } });
  }

  async find(id: string) {
    const category = await this.db.findOne({
      relations: { ads: true },
      where: { id }
    });
    if (!category) {
      throw new Error('This Category doesnt exist.');
    }
    return category;
  }
}