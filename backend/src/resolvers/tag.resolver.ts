import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Tag, TagInput } from "../entities/tag.entity";
import { TagService } from "../services/tag.service";

@Resolver()
export class TagResolver {
  @Mutation(() => Tag)
  async createTag(@Arg("infos") infos: TagInput) {
    const result: Tag[] = await new TagService().create({
      name: infos.name,
    });
    return result;
  }

  @Query(() => [Tag])
  async getAllTags() {
    return await new TagService().list();
  }

  @Query(() => Tag)
  async getTagById(@Arg("id") id: string) {
    return await new TagService().find(id);
  }

  @Mutation(() => Tag)
  async updateTag(@Arg("id") id: string, @Arg("infos") infos: TagInput) {
    return await new TagService().update(id, infos);
  }

  @Mutation(() => Tag)
  async deleteTag(@Arg("id") id: string) {
    return await new TagService().delete(id);
  }
}