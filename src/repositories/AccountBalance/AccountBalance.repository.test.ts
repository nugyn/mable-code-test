import { AccountBalance } from "src/types/accountBalance.model";
import { AccountBalanceEntity } from "../../types/accountBalance.domain";
import { MockAccountBalanceRepository } from "./AccountBalance.repository";
import { IAccountBalanceRepository } from "./IAccountBalance.repository";
import { IDatabaseClient } from "src/clients/clients.interface";

const mockDBClient: IDatabaseClient<AccountBalance> = {
  insert: jest.fn().mockResolvedValue({}),
  getAll: jest.fn().mockResolvedValue([
    {
      id: "1111234522226789",
      balance: 5000,
      date: "mock-date",
    },
    {
      id: "1111234522221234",
      balance: 10000,
      date: "mock-date",
    },
    {
      id: "2222123433331212",
      balance: 550,
      date: "mock-date",
    },
    {
      id: "1212343433335665",
      balance: 1200,
      date: "mock-date",
    },
    {
      id: "3212343433335755",
      balance: 50000,
      date: "mock-date",
    },
  ] as AccountBalance[]),
  getById: jest.fn().mockResolvedValue({}),
  update: jest.fn().mockResolvedValue({}),
  delete: jest.fn().mockResolvedValue({}),
};

describe("Account Balance Repository", () => {
  let repo: IAccountBalanceRepository;
  
  beforeAll(async () => {
    repo = new MockAccountBalanceRepository(mockDBClient)
  });

  it("will get all account balances", async () => {
    const expected: AccountBalanceEntity[] = [
      {
        id: "1111234522226789",
        balance: 5000,
        date: "mock-date",
      },
      {
        id: "1111234522221234",
        balance: 10000,
        date: "mock-date",
      },
      {
        id: "2222123433331212",
        balance: 550,
        date: "mock-date",
      },
      {
        id: "1212343433335665",
        balance: 1200,
        date: "mock-date",
      },
      {
        id: "3212343433335755",
        balance: 50000,
        date: "mock-date",
      },
    ];

    //Assert
    const result = await repo.getAllAccountBalances();

    //Act
    expect(result).toStrictEqual(expected);
  });

  it("will update account balance by id", async () => {
    const expected: AccountBalanceEntity = {
      id: "1111234522226789",
      balance: 5000,
      date: "mock-date",
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
