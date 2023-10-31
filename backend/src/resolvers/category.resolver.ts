import { Category } from "../entities/category";
import { Query, Mutation, Resolver, Arg } from "type-graphql";
import { CreateCategoryInput } from "./inputs/CreateCategoryInput";
import { UpdateCategoryInput } from "./inputs/UpdateCategoryInput";

@Resolver()
export class CategoryResolver {
  @Query(() => [Category])
  allCategories() {
    const categories = Category.find({ 
      relations: { 
        ads: true
      } 
      });
    return categories;
  }

  @Mutation(() => String)
  async deleteCategoryById(@Arg("id") id: number) {
    const categoryToDelete = await Category.findOneByOrFail({
      id
    });
    categoryToDelete.remove();
    return "The Category has been deleted";
  }

  @Mutation(() => Category)
  async createCategory(@Arg("newCategory") data: CreateCategoryInput) {
    const newCategory = Category.create({...data});
    await newCategory.save();
    return newCategory;
  }

  @Mutation(() => Category)
  async updateCategory(@Arg("id") id: number, @Arg("data") data: UpdateCategoryInput) {
    const category = await Category.findOne({where:{id}});
    if(!category) throw new Error("Category not found!");
    Object.assign(category, data);
    await category.save()
    return `Category has been modified!`;
  }
}