import {
  AccountBalance,
  AccountBalanceModel,
} from "../types/accountBalance.model";
import { IAccountBalanceRepository } from "./IAccountBalance.repository";
import { IDatabaseClient } from "../clients/clients.interface";
import { AccountBalanceEntity } from "src/types/accountBalance.domain";
import { MongoDBClient } from "../clients/clients";

export class MockAccountBalanceRepository implements IAccountBalanceRepository {
  private dbClient: IDatabaseClient<AccountBalance> | undefined;
  constructor() {
    this.dbClient = new MongoDBClient<AccountBalance>(AccountBalanceModel);
  }

  async getAllAccountBalances(): Promise<AccountBalanceEntity[]> {
    try {
      if (!this.dbClient) {
        throw new Error("no db client");
      }
      const data = (await this.dbClient.getAll()).map((data) => {
        return {
          id: data.id,
          balance: data.balance,
          date: data.date, // format here?
        };
      });
      return data;
    } catch(e) {
      console.error(e);
      return [];
    }
  }
}

export class AccountBalanceRepository implements IAccountBalanceRepository {
  private dbClient: IDatabaseClient<AccountBalance> | undefined;

  constructor(dbClient: IDatabaseClient<AccountBalance>) {
    this.dbClient = dbClient
      ? new MongoDBClient<AccountBalance>(AccountBalanceModel)
      : dbClient;
  }

  async getAllAccountBalances(): Promise<AccountBalanceEntity[]> {
    try {
      if (!this.dbClient) {
        throw new Error("no db client");
      }
      const data = (await this.dbClient.getAll()).map((data) => {
        return {
          id: data.id,
          balance: data.balance,
          date: data.date, // format here?
        };
      });
      return data;
    } catch (e) {
      console.error(e);
      return [];
    }
  }
}