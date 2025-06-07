import { loadCSV } from "../utils/loadCSV";
import { AccountBalance, BalanceSheets } from "../types/Balances.type";
import { IAccountBalanceRepository } from "./IAccountBalance.repository";

class MockAccountBalanceRepository implements IAccountBalanceRepository {
  async getAllAccountBalances(): Promise<BalanceSheets> {
    const filePath = process.env.ACCOUNT_BALANCE_FILE_PATH;

    if (!filePath) {
      throw new Error("ACCOUNT_BALANCE_FILE_PATH is not defined");
    }
    const loadData = await loadCSV(filePath as string);
    return loadData.reduce((acc, curr) => {
      return {
        ...acc,
        [curr.id]: {
          balance: curr.balance,
          date: '0000',
        }
      };
    }, {});
  }
  loadAccountBalances(): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  loadAccountBalanceById(id: string): Promise<boolean> {
    console.log(id);
    throw new Error("Method not implemented.");
  }
  getAccountBalanceById(id: string): Promise<AccountBalance> {
    console.log(id);
    throw new Error("Method not implemented.");
  }
}

export default MockAccountBalanceRepository;
