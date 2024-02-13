import datasource from "../../config/datasource";
import { User, UserInput } from "../entities/user.entity";
import { Repository } from "typeorm";

export default class UserService {
  db: Repository<User>;
  constructor() {
    this.db = datasource.getRepository(User);
  }

  async create({ email, password }: UserInput) {
    const newUser = this.db.create({ email, password });
    return await this.db.save(newUser);
  }

  async find(email: string) {
    return await this.db.findOneBy({ email });
  }

  async list() {
    return this.db.find();
  }


  async delete(email: string) {
    const user = await this.find(email);

    if (!user) {
      throw new Error("User with this email doesnt exist");
    }
    await this.db.remove(user);
    return await this.list();

  }
}