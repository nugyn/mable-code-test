import { AccountBalanceEntity } from "../../types/accountBalance.domain";
export interface IAccountBalanceRepository {
  getAllAccountBalances(): Promise<AccountBalanceEntity[]>;
  getAccountBalanceById(id: string): Promise<AccountBalanceEntity>;
  updateAccountBalanceById(
    id: string,
    amount: number
  ): Promise<AccountBalanceEntity>;
}
