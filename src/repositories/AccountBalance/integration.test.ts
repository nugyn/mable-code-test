import { AccountBalanceRepository } from "./AccountBalance.repository";
import { AccountBalanceEntity } from "../../types/accountBalance.domain";
import { TestMongoDBConnection } from "../../utils/db";
import { IAccountBalanceRepository } from "./IAccountBalance.repository";
import { MongoDBClient } from "../../clients/clients";
import { AccountBalanceModel } from "../../types/accountBalance.model";

describe("Account Balance Repository", () => {
  let connection: TestMongoDBConnection;
  let repo: IAccountBalanceRepository;
  
  beforeAll(async () => {
    connection = new TestMongoDBConnection();
    await connection.connect();
    repo = new AccountBalanceRepository(new MongoDBClient(AccountBalanceModel));
  });

  beforeEach(async () => {
    await connection.reset();
    await connection.initialiseData();
  });

  afterAll(async () => {
    await connection.disconnect();
  });

  it("will get all account balances", async () => {
    //Arrange
    const expected: AccountBalanceEntity[] = [
      {
        id: "1111234522226789",
        balance: 5000,
        date: expect.any(String),
      },
      {
        id: "1111234522221234",
        balance: 10000,
        date: expect.any(String),
      },
      {
        id: "2222123433331212",
        balance: 550,
        date: expect.any(String),
      },
      {
        id: "1212343433335665",
        balance: 1200,
        date: expect.any(String),
      },
      {
        id: "3212343433335755",
        balance: 50000,
        date: expect.any(String),
      },
    ];

    //Assert
    const result = await repo.getAllAccountBalances();

    //Act
    expect(result).toStrictEqual(expected);
  });

  it("will update account balance by id", async () => {
    //Arrange
    const expected: AccountBalanceEntity = {
      id: "1111234522226789",
      balance: 5000,
      date: expect.any(String)
    };

    //Assert
    const result = await repo.updateAccountBalanceById(
      "1111234522226789",
      5000
    );

    //Act
    expect(result).toStrictEqual(expected);
  });
});
