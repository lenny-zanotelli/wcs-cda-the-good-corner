import datasource from "../../config/datasource";
import { Category, CategoryInput } from "../entities/category.entity";
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

  async create(data: Partial<CategoryInput>) {
    const newCategory = this.db.create(data);
    newCategory.ads = [];
    return await this.db.save(newCategory);
  }

  async update(id: string, data: Partial<Category>) {
    const category = await this.find(id);
    const newInfos = this.db.merge(category, data);
    return await this.db.save(newInfos);
  }

  async delete(id: string) {
    const category = await this.find(id);
    await this.db.remove(category);
    return await this.list();
  }
}