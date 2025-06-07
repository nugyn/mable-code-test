import { IDatabaseClient } from "./clients.interface";
import { Model } from "mongoose";

export class MongoDBClient<T> implements IDatabaseClient<T> {
  private model: Model<T>;
  constructor(model: Model<T>) {
    this.model = model;
  }
  async insert(item: T): Promise<void> {
    await this.model.create(item);
  }
  async getAll(): Promise<T[]> {
    try {
      const result = await this.model.find();
      console.log(result);
      return result;
    } catch {
      console.error("Issue fetching data");
      return [];
    }
  }
  async getById(id: string): Promise<T | null> {
    try {
      const result = await this.model.findOne({
        id: id,
      });
      console.log("found result", result);
      return result;
    } catch (e) {
      console.error(`Issue fetching data`, e);
      return null;
    }
  }
  async update(id: string, update: Partial<T>): Promise<void> {
    try {
      const result = await this.model.updateOne(
        {
          id: id,
        },
        { $set: update }
      );
      console.log(result);
    } catch (e) {
      console.error("Issue fetching data");
      throw new Error(`Could not update record for reasons: ${e}`);
    }
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
