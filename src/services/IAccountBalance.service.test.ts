import AccountBalanceService from "./AccountBalance.service";
import { AccountBalanceRepository } from "../repositories/AccountBalance.repository";
import { TestMongoDBConnection } from "../utils/db";
import { IAccountBalanceService } from "./IAccountBalance.service";
import { IAccountBalanceRepository } from "src/repositories/IAccountBalance.repository";

describe("Account Balance Service", () => {
  let connection: TestMongoDBConnection;
  let repo: IAccountBalanceRepository;
  let service: IAccountBalanceService;

  beforeAll(async () => {
    connection = new TestMongoDBConnection();
    await connection.connect();

    repo = new AccountBalanceRepository();
    service = new AccountBalanceService(repo);
  });

  beforeEach(async () => {
    await connection.reset();
    await connection.initialiseData();
  });

  afterAll(async () => {
    await connection.disconnect();
  });

  it("getAllAccountBalances", async () => {
    //Arrange
    const expected = {
      "1111234522221234": {
        balance: 10000,
        date: "placeholder-tbc",
      },
      "1111234522226789": {
        balance: 5000,
        date: "placeholder-tbc",
      },
      "1212343433335665": {
        balance: 1200,
        date: "placeholder-tbc",
      },
      "2222123433331212": {
        balance: 550,
        date: "placeholder-tbc",
      },
      "3212343433335755": {
        balance: 50000,
        date: "placeholder-tbc",
      },
    };

    //Act
    const result = await service.getAllAccountBalances();

    //Assert
    expect(result).toStrictEqual(expected);
  });

  it("processTransactions", async () => {
    //Arrange
    const expected = {
      "1111234522221234": {
        balance: 10000,
        date: "0000",
      },
      "1111234522226789": {
        balance: 5000,
        date: "0000",
      },
      "1212343433335665": {
        balance: 1200,
        date: "0000",
      },
      "2222123433331212": {
        balance: 550,
        date: "0000",
      },
      "3212343433335755": {
        balance: 50000,
        date: "0000",
      },
    };

    //Act
    const result = await service.processTransactions();

    //Assert
    expect(result).toStrictEqual(expected);
  });
});
