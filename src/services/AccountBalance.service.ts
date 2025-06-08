import { BalanceSheets } from "../types/accountBalance.dto";
import { IAccountBalanceService } from "./IAccountBalance.service";
import { IAccountBalanceRepository } from "../repositories/AccountBalance/IAccountBalance.repository";
import { DataType, loadCSV } from "../utils/loadCSV";
import { Transaction } from "../types/accountBalance.model";
import { calculateBalance } from "../utils/balance.utils";

class AccountBalanceService implements IAccountBalanceService {
  private repository;
  constructor(repository: IAccountBalanceRepository) {
    this.repository = repository;
  }

  async getAllAccountBalances(): Promise<BalanceSheets> {
    try {
      const balances = await this.repository.getAllAccountBalances();
      return balances.reduce((acc, curr) => {
        return {
          ...acc,
          [curr.id]: {
            balance: curr.balance,
            date: curr.date,
          },
        };
      }, {} as BalanceSheets);
    } catch (e) {
      throw new Error("Issue retrieve all accounts balance");
    }
  }

  async processTransactions(): Promise<BalanceSheets> {
    try {
      let result: BalanceSheets = {};

      const transactions = (await loadCSV(
        DataType.Transaction
      )) as Transaction[];

      for (const transaction of transactions) {
        const { recipientId, senderId, amount } = transaction;

        // retrieve account balance of recipieint and sender id
        const recipient = await this.repository.getAccountBalanceById(
          recipientId
        );
        const sender = await this.repository.getAccountBalanceById(senderId);

        // update balances
        const newBalance = calculateBalance(
          sender.balance,
          recipient.balance,
          amount
        );
        const senderBalance = newBalance.senderBalance;
        const recipientBalance = newBalance.recipientBalance;

        // update each one by id
        const results = await Promise.all([
          await this.repository.updateAccountBalanceById(
            recipientId,
            recipientBalance
          ),
          await this.repository.updateAccountBalanceById(
            senderId,
            senderBalance
          ),
        ]);

        console.debug("DEBUG", results);

        result = {
          ...result,
          [results[0].id]: {
            balance: results[0].balance,
            date: results[0].date,
          },
          [results[1].id]: {
            balance: results[0].balance,
            date: results[0].date,
          },
        };
      }

      return result;
    } catch (e) {
      console.error("Error processing transactions", e);
      throw new Error("Error processing transactions");
    }
  }
}

export default AccountBalanceService;
