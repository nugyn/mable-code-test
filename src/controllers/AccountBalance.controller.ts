import { IAccountBalanceService } from "src/services/IAccountBalance.service";
import { IAccountBalanceController } from "./IAccountBalance.controller"
import { Request, Response} from 'express'

class AccountBalanceController implements IAccountBalanceController {
  private service: IAccountBalanceService
  constructor(service: IAccountBalanceService) {
    this.service = service
  }

  getAllAccountBalances(_req: Request, res: Response) {
    try {
        const result = this.service.getAllAccountBalances()
        res.status(200).json(result)
    } catch {
        throw new Error("to be implemented");
    }
  }
}

export default AccountBalanceController