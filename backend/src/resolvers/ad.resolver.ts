import { Ad } from "../entities/ad.entity";
import { Arg, Resolver, Query } from "type-graphql";

import AdService from "src/services/ad.service";

@Resolver()
export class AdResolver {
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
}
  
  // @Authorized()
  // @Mutation(() => Ad)
  // async createAd(
  // @Arg("newAd") AdInput: CreateAdInput, 
  // @Ctx() ctx: JWTContext
  // ) {
  //   console.log("ctx", ctx);
  //   console.log("adinput", AdInput);
  //   if (AdInput.tags) {
  //     return await Ad.save({
  //       ...AdInput,
  //       category: { id: AdInput.category },
  //       tags: AdInput.tags.map((el) => ({ id: el})),
  //     });
  //   } else {
  //     return await Ad.save({
  //       ...AdInput,
  //       owner: ctx.user?.email,
  //       category: { id: AdInput.category },
  //       tags: [],
  //     });
      

  //   }
  // }

  // @Authorized()
  // @Mutation(() => String)
  // async deleteAd(@Arg("id") id: number) {
  //   const adToDelete = await Ad.findOneByOrFail({
  //     id
  //   });
  //   adToDelete.remove();
  //   return "Ad has been deleted";
  // }

  // @Authorized()
  // @Mutation(() => Ad)
  // async updateAd(
  //   @Arg("id") id: number, 
  //   @Arg("data") data: UpdateAdInput,
  //   ) {
  //     // const adToUpdate = await Ad.findOneByOrFail({ id: id});
  //     // if (adToUpdate.owner !== ctx.user?.email && ctx.user?.role !== "admin") {
  //     //   throw new Error("YOu cant edit this ad");
  //     // }
  //   const newData: any = { ...data };
    
  //   if (data.category) {
  //     newData.category = { id: newData.category};
  //   }

  //   if (data.tags) {
  //     newData.tags = data.tags.map((el) => ({ id: el }));
  //   }

  //   return await Ad.save({ id, ...newData});
  // }