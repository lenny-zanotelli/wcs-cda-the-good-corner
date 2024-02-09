import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Category, CategoryInput } from "../entities/category.entity";
import CategoryService from "../services/category.service";

@Resolver()
export class CategoryResolver {
  @Mutation(() => Category)
  async createCategory(@Arg("infos") infos: CategoryInput) {
    const newCategory = await new CategoryService().create({...infos});
    return newCategory;
  }
  
  @Query(() => [Category])
  async getAllCategories() {
    const categories: Category[] = await new CategoryService().list();
    return categories;
  }

  @Query(() => Category)
  async getOneCategoryById(@Arg("id") id: string) {
    const category = await new CategoryService().find(id);
    return category;
  }


  @Mutation(() => Category)
  async updateCategory(
    @Arg("id") id: string,
    @Arg("infos") infos: CategoryInput
    ) {
      const newCategory = await new CategoryService().update(id, infos);
      return newCategory;
    }
  
  @Mutation(() => [Category])
  async deleteCategory(@Arg("id") id: string) {
    const categories: Category[] = await new CategoryService().delete(id);
    return categories;
  }
}