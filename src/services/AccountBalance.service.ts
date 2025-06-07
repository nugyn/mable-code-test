
import { BalanceSheets } from "src/types/accountBalance.dto";
import { IAccountBalanceService } from "./IAccountBalance.service";
import { IAccountBalanceRepository } from "src/repositories/IAccountBalance.repository";

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
                    date: curr.date
                }
            }
        }, {})
    } catch(e){
        throw new Error('Issue retrieve all accounts balance')
    }
  }
}

export default AccountBalanceService