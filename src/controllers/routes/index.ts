import express from "express";
import { healthCheck } from "../handlers/healthcheck";
import AccountBalanceController from "../AccountBalance.controller";
import AccountBalanceService from "../../services/AccountBalance.service";
import { AccountBalanceRepository } from "../../repositories/AccountBalance/AccountBalance.repository";
import { MongoDBClient } from "../../clients/clients";
import { AccountBalanceModel } from "../../types/accountBalance.model";
const router = express.Router();

/* GET home page. */
router.get("/healthcheck", healthCheck);

/* Account Balance */
const client = new MongoDBClient(AccountBalanceModel)
const repo = new AccountBalanceRepository(client)
const service = new AccountBalanceService(repo)
const accountBalanceController = new AccountBalanceController(service)

router.get("/accountBalance", accountBalanceController.getAllAccountBalances);

export default router;
