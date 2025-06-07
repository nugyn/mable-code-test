import { Request, Response } from "express";

export interface IAccountBalanceController {
  getAllAccountBalances(req: Request, res: Response): void;
}
