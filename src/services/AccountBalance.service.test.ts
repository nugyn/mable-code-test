import AccountBalanceService from "./AccountBalance.service";
import { AccountBalanceRepository } from "../repositories/AccountBalance/AccountBalance.repository";
import { TestMongoDBConnection } from "../utils/db";
import { IAccountBalanceService } from "./IAccountBalance.service";
import { IAccountBalanceRepository } from "../repositories/AccountBalance/IAccountBalance.repository";

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
        date: expect.any(String),
      },
      "1111234522226789": {
        balance: 5000,
        date: expect.any(String),
      },
      "1212343433335665": {
        balance: 1200,
        date: expect.any(String),
      },
      "2222123433331212": {
        balance: 550,
        date: expect.any(String),
      },
      "3212343433335755": {
        balance: 50000,
        date: expect.any(String),
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
        date: expect.any(String),
      },
      "1111234522226789": {
        balance: 5000,
        date: expect.any(String),
      },
      "1212343433335665": {
        balance: 1200,
        date: expect.any(String),
      },
      "2222123433331212": {
        balance: 550,
        date: expect.any(String),
      },
      "3212343433335755": {
        balance: 50000,
        date: expect.any(String),
      },
    };

    //Act
    const result = await service.processTransactions();

    //Assert
    expect(result).toStrictEqual(expected);
  });
});
