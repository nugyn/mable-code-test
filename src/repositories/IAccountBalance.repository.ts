
import { AccountBalanceEntity } from "../types/accountBalance.domain";
export interface IAccountBalanceRepository {
  getAllAccountBalances(): Promise<AccountBalanceEntity[]>;
}
