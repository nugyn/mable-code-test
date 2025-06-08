import {
  AccountBalance,
  AccountBalanceModel,
} from "../types/accountBalance.model";
import { IAccountBalanceRepository } from "./IAccountBalance.repository";
import { IDatabaseClient } from "../clients/clients.interface";
import { AccountBalanceEntity } from "src/types/accountBalance.domain";
import { MongoDBClient } from "../clients/clients";

export class AccountBalanceRepository implements IAccountBalanceRepository {
  private dbClient: IDatabaseClient<AccountBalance>
  constructor(dbClient: IDatabaseClient<AccountBalance>) {
    this.dbClient = dbClient ?? new MongoDBClient<AccountBalance>(AccountBalanceModel);
  }

  async getAllAccountBalances(): Promise<AccountBalanceEntity[]> {
    try {
      const data = (await this.dbClient.getAll()).map((data) => {
        return {
          id: data.id,
          balance: data.balance,
          date: data.date,
        };
      });
      return data;
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  async getAccountBalanceById(id: string): Promise<AccountBalanceEntity> {
    try {
      const current = await this.dbClient?.getById(id);
      if (!current) {
        throw new Error(`No record exists with ${id}`);
      }
      return {
        id: id,
        balance: current.balance,
        date: Date.now().toString()
      };
    } catch (e) {
      console.error(e);
      throw new Error(`Error updating account balance, ${e}`);
    }
  }

  async updateAccountBalanceById(
    id: string,
    amount: number
  ): Promise<AccountBalanceEntity> {
    try {
      const current = await this.dbClient?.getById(id);
      console.log("31231231231312", current);
      if (!current) {
        throw new Error(`No record exists with ${id}`);
      }
      await this.dbClient?.update(id, {
        balance: amount,
      });
      return {
        id: id,
        balance: amount,
        date: "0000",
      };
    } catch (e) {
      console.error(e);
      throw new Error(`Error updating account balance, ${e}`);
    }
  }
}

export class TestAccountBalanceRepository implements IAccountBalanceRepository {
  private dbClient: IDatabaseClient<AccountBalance> | undefined;

  constructor(dbClient: IDatabaseClient<AccountBalance>) {
    this.dbClient = dbClient
      ? new MongoDBClient<AccountBalance>(AccountBalanceModel)
      : dbClient;
  }
  
  async getAccountBalanceById(id: string): Promise<AccountBalanceEntity> {
    throw new Error("Method not implemented.");
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
          date: data.date, // return as ms, not sur eif a I should formt when returning form repo
        };
      });
      return data;
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  async updateAccountBalanceById(): Promise<AccountBalanceEntity> {
    throw new Error("to be implemented");
  }
}
