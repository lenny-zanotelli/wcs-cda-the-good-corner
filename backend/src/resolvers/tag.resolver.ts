import { Tag } from "../entities/tag.entity";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { CreateTagInput } from "./inputs/Tag/CreateTagInput";
import { UpdateTagInput } from "./inputs/Tag/UpdateTagInput";

@Resolver()
export class TagResolver {
  @Query(() => [Tag])
  getAllTags() {
    const tags = Tag.find({
      relations: {
        ads: true
      }
    });
    return tags;
  }

  @Mutation(() => String)
  async deleteTagById(@Arg("id") id: number) {
    const tagToDelete = await Tag.findOneByOrFail({
      id
    });
    tagToDelete.remove();
    return "The Tag has been deleted"
  }

  @Mutation(() => Tag)
  async createTag(@Arg("newTag") data: CreateTagInput) {
    const newTag = Tag.create({...data});
    await newTag.save();
    return newTag;
  }

  @Mutation(() => Tag)
  async updateTag(@Arg("id") id: number, @Arg("data") data: UpdateTagInput) {
    await Tag.update(id, {...data});
    const updateTag = await Tag.findOneBy({ id });
    return updateTag;
  }

}