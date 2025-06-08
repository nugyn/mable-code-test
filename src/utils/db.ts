import mongoose from "mongoose";
import { DataType, loadCSV } from "./loadCSV";
import {
  AccountBalance,
  AccountBalanceModel,
} from "../types/accountBalance.model";

export interface IDatabaseConnection {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  isConnected(): boolean;
}

type DBConfig = {
  uri: string;
};

export class MongoDBConnection implements IDatabaseConnection {
  constructor(private config: DBConfig) {}
  async connect(): Promise<void> {
    try {
      await mongoose.connect(this.config.uri);
      console.log("MongoDB connected.");
    } catch (e) {
      console.error("Connection error", e);
      process.exit(1);
    }
  }

  async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      console.log("MongoDB Disconnected");
    } catch (e) {
      console.error("Disconnection error,", e);
    }
  }

  isConnected(): boolean {
    return mongoose.connection.readyState === 1;
  }
}

export class TestMongoDBConnection implements IDatabaseConnection {
  constructor(
    private config: DBConfig = {
      uri: "mongodb://localhost:27018/mongo-test",
    }
  ) {}
  async connect(): Promise<void> {
    try {
      if(mongoose.connection.readyState !== 1) {
        await mongoose.connect(this.config.uri);
        console.log("MongoDB connected.");
        return;
      }
      console.log("MongoDB already connected.");
      return;
    } catch (e) {
      console.error("Connection error", e);
      process.exit(1);
    }
  }

  async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      console.log("MongoDB Disconnected");
    } catch (e) {
      console.error("Disconnection error,", e);
    }
  }

  isConnected(): boolean {
    return mongoose.connection.readyState === 1;
  }

  async reset(): Promise<void> {
    const collections = mongoose.connection.collections;
    for(const key in collections) {
      await collections[key].deleteMany({});
    }
  }

  async initialiseData(): Promise<void> {
    const filePath = process.env.ACCOUNT_BALANCE_FILE_PATH;
    if (!filePath) {
      throw new Error("ACCOUNT_BALANCE_FILE_PATH is not defined");
    }
    const loadData = (await loadCSV(
      DataType.AccountBalance
    )) as AccountBalance[];

    const documents: AccountBalance[] = loadData.map((data) => ({
      id: data.id,
      balance: data.balance,
      date: expect.any(String),
    }));

    const response = await AccountBalanceModel.insertMany(documents, {
      throwOnValidationError: true,
    });

    console.log("Init data ", response);
  }
}
