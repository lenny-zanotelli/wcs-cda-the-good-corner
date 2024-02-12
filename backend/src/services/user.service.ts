import datasource from "config/datasource";
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
    return this.db.find({
      relations: { ads: true }
    });
  }
}