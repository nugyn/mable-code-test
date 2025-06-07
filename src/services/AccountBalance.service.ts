import { BalanceSheets } from "../types/accountBalance.dto";
import { IAccountBalanceService } from "./IAccountBalance.service";
import { IAccountBalanceRepository } from "../repositories/IAccountBalance.repository";
import { DataType, loadCSV } from "../utils/loadCSV";
import { Transaction } from "../types/accountBalance.model";

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
      }, {});
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

      transactions.forEach(async (t) => {
        const { recipientId, senderId, amount } = t;

        // retrieve account balance of recipieint and sender id
        const recipient = await this.repository.getAccountBalanceById(
          recipientId
        );
        const sender = await this.repository.getAccountBalanceById(senderId);

        // update balances
        const senderBalance = sender.balance - amount;

        if (senderBalance <= 0) {
          throw new Error(
            `Cannot transfer this amount to recipient with id ${recipientId} sender ${senderId} does not have enough balance`
          );
        }
        console.debug(`DEBUG, ${recipient} and ${sender}`);
        recipient.balance = recipient.balance + amount;
        // update each one by id
        const results = await Promise.all([
          await this.repository.updateAccountBalanceById(
            recipientId,
            recipient.balance
          ),
          await this.repository.updateAccountBalanceById(
            recipientId,
            sender.balance
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
      });

      return result;
    } catch (e) {
      console.error("Error processing transactions", e);
      throw new Error("Error processing transactions");
    }
  }
}

export default AccountBalanceService;
