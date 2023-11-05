import { Ad } from "../entities/ad";
import { Arg, Resolver, Query, Mutation } from "type-graphql";
import { CreateAdInput } from "./inputs/CreateAdInput";
import { Like } from "typeorm";
import { UpdateAdInput } from "./inputs/UpdateAdInput";

@Resolver()
export class AdResolver {
  @Query(() => [Ad])
  async getAllAds(
    @Arg("category", { nullable: true }) category?: string,
    @Arg("title", { nullable: true}) title?: string) {
    if (category) {
      return await Ad.find({
        where: { 
          category: { 
            name: Like(`%${category}%`)
          }
        },
        relations: {
          category: true,
          tags: true,
        },
      });
    } else if (title) {
      return await Ad.find({
        where: {
          title: Like(`%${title}%`)
        },
        relations: {
          category: true,
          tags: true
        }
      })
      
    } else {
      return await Ad.find({ 
        relations: { 
          category: true, 
          tags: true 
        } 
      });
    }
  }

  @Query(() => Ad, { nullable: true })
  getAdById(@Arg("id") id: number) {
    return Ad.findOneBy({ id });
  }

  @Mutation(() => Ad)
  async createAd(@Arg("newAd") AdInput: CreateAdInput
  ) {
    console.log(AdInput);
    if (AdInput.tags) {
      return await Ad.save({
        ...AdInput,
        category: { id: AdInput.category },
        tags: AdInput.tags.map((el) => ({ id: el})),
      });
    } else {
      return await Ad.save({
        ...AdInput,
        category: { id: AdInput.category },
        tags: [],
      });
      

    }
  }

  @Mutation(() => String)
  async deleteAd(@Arg("id") id: number) {
    const adToDelete = await Ad.findOneByOrFail({
      id
    });
    adToDelete.remove();
    return "Ad has been deleted";
  }

  @Mutation(() => Ad)
  async updateAd(@Arg("id") id: number, @Arg("data") data: UpdateAdInput) {
    console.log(data);
    const newData: any = { ...data };
    
    if (data.category) {
      newData.category = { id: newData.category};
    }

    if (data.tags) {
      newData.tags = data.tags.map((el) => ({ id: el }));
    }

    return await Ad.save({ id, ...newData});
  }
}