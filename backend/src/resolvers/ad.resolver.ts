import { Ad, CreateAdInput, UpdateAdInput } from "../entities/ad.entity";
import { Arg, Resolver, Query, Mutation, Ctx } from "type-graphql";

import AdService from "../services/ad.service";
import { JWTContext } from "src";

@Resolver()
export class AdResolver {
  @Mutation(() => Ad)
  async createAd(
  @Arg("infos") infos: CreateAdInput,
  @Ctx() ctx: JWTContext
  ) {
    const result: Ad = await new AdService().create({
      ...infos,
      owner: ctx.user?.email
    });
    return result;
  }

  @Query(() => [Ad])
  async getAllAds(@Arg("search", { nullable: true }) search: string) {
    const ads: Ad[] = await new AdService().list(search)
    return ads;
  }
  
  @Query(() => Ad)
  async getAdById(@Arg("id") id: string) {
    const ad: Ad = await new AdService().find(id);
    return ad;
  }
  
  @Mutation(() => Ad)
  async updateAd(
    @Arg("id") id: string, @Arg("infos") infos: UpdateAdInput,
    ) {
    const ad: Ad = await new AdService().update(id, infos);
    return ad;
  }

  @Mutation(() => [Ad])
  async deleteAd(@Arg("id") id: string) {
    const ads: Ad[] = await new AdService().delete(id);
    return ads;
  }
}