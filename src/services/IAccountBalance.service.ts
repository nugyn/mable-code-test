import { BalanceSheets } from "src/types/accountBalance.dto";

export interface IAccountBalanceService {
  getAllAccountBalances(): Promise<BalanceSheets>;
}