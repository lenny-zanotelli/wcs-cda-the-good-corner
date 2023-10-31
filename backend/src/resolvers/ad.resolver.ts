import { Ad } from "../entities/ad";
import { Arg, Resolver, Query, Mutation } from "type-graphql";
import { CreateAdInput } from "./inputs/CreateAdInput";
import { Like } from "typeorm";

@Resolver()
export class AdResolver {
  @Query(() => [Ad])
  async getAllAds(@Arg("category", { nullable: true }) category?: string) {
    if (category) {
      return await Ad.find({
        where: { 
          category: { 
            name: Like(`%${category}%`)
          }
        },
        relations: {
          category: true,
        },
      });
    } else {
      return await Ad.find({ relations: { category: true } });
    }
  }

  @Query(() => Ad, { nullable: true })
  getAdById(@Arg("id") id: number) {
    return Ad.findOneBy({ id });
  }

  @Mutation(() => Ad)
  async createAd(@Arg("newAd") AdInput: CreateAdInput
  ) {
    const newAd = Ad.create({...AdInput});
    await newAd.save();
    return newAd; 
  }

  @Mutation(() => Ad)
  async deleteAd(@Arg("id") id: number) {
    const adToDelete = await Ad.findOneByOrFail({
      id
    });
    adToDelete.remove();
    return "Ad has been deleted";
  }
}