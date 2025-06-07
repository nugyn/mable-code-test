import { AccountBalance, BalanceSheets } from "src/types/Balances.type";

export interface IAccountBalanceRepository {
  getAllAccountBalances(): Promise<BalanceSheets>;
  loadAccountBalances(): Promise<boolean>;
  loadAccountBalanceById(id: string): Promise<boolean>;
  getAccountBalanceById(id: string): Promise<AccountBalance>;
}
