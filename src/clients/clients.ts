import { IDatabaseClient } from "./clients.interface"
import {Model} from "mongoose"
import mongoose from 'mongoose'
import {
  AccountBalanceModel,
  AccountBalance,
} from "../types/accountBalance.model";
import { loadCSV } from "../utils/loadCSV";

 // mongoose.connection.on('connected', () => {
    //     console.log('connected')
    // })

    // mongoose.connection.on("disconnected", () => {
    //   console.log("disconnected");
    // });

    // mongoose.connection.on("error", () => {
    //   console.log("error");
    // });

    // mongoose.connection.on("SIGINT", async () => {
    //   await mongoose.disconnect();
    //   process.exit(0)
    // });

const connectDB = async (uri: string) => {
  try {
    await mongoose.connect(uri);
    
    console.log("MongoDB connected.");
  } catch (err) {
    console.error("Connection error", err);
    return;
  }
};

export class MongoDBClient<T> implements IDatabaseClient<T> {
   private model: Model<T>
   constructor(model: Model<T>) {
    this.model = model
   }
    async insert(item: T): Promise<void> {
        await this.model.create(item)
    }
    async getAll(): Promise<T[]> {
        try {
            const result = await this.model.find();
            console.log(result)
            return result
        } catch {
            console.error('Issue fetching data')
            return []
        }
    }
    getById(id: string): Promise<T | null> {
        throw new Error("Method not implemented.");
    }
    update(id: string, update: Partial<T>): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}