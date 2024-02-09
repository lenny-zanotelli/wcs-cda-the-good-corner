import { validate } from "class-validator";
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
    const errors = await validate(data);
    if (errors.length > 0) {
      throw new Error('Invalid input data')
    }
    try {
      const newCategory = this.db.create(data);
      newCategory.ads = [];


      return await this.db.save(newCategory);
    } catch (error) {
      throw new Error(`Failed to create category :${error.message}`);
    }
  }

  async update(id: string, data: Partial<Category>) {
    const errors = await validate(data);
    if (errors.length > 0) {
      throw new Error('Invalid input data')
    }
    try {
      const category = await this.find(id);
      const newInfos = this.db.merge(category, data);

      return await this.db.save(newInfos); 
    } catch (error) {
      throw new Error(`Failed to update category :${error.message}`);
    }
  }

  async delete(id: string) {
    const category = await this.find(id);
    await this.db.remove(category);
    return await this.list();
  }
}