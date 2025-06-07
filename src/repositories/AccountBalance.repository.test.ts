import mongoose from "mongoose";
import { MockAccountBalanceRepository } from "./AccountBalance.repository";
import { AccountBalanceEntity } from "../types/accountBalance.domain";
import { loadCSV } from "../utils/loadCSV";
import { AccountBalance, AccountBalanceModel } from "../types/accountBalance.model";

describe("Account Balance Repository", () => {
  beforeAll(async () =>{
    await mongoose.connect("mongodb://localhost:27017/mongo-local")

     const filePath = process.env.ACCOUNT_BALANCE_FILE_PATH;
        
        if (!filePath) {
            throw new Error("ACCOUNT_BALANCE_FILE_PATH is not defined");
        }
        const loadData = await loadCSV(filePath as string);
    
        const documents: AccountBalance[] = loadData.map((data) => {
          return {
            id: data.id,
            balance: data.balance,
            date: "0000",
          };
        });
    
        await AccountBalanceModel.insertMany(documents, { throwOnValidationError: true });
  })

  afterEach(async () => {
    await AccountBalanceModel.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
  
  it("will get all account balances", async () => {
    //Arrange
    const mockRepo = new MockAccountBalanceRepository();

    const expected: AccountBalanceEntity[] = [
      {
        id: "1111234522226789",
        balance: 5000,
        date: "0000",
      },
      {
        id: "1111234522221234",
        balance: 10000,
        date: "0000",
  
      },
      {
        id: "2222123433331212",
        balance: 550,
        date: "0000",
      
      },
      {
        id: "1212343433335665",
        balance: 1200,
        date: "0000",
      
      },
      {
        id: "3212343433335755",
        balance: 50000,
        date: "0000",
      
      },
    ];

    //Assert
    const result = await mockRepo.getAllAccountBalances();
    
    //Act
    expect(result).toStrictEqual(expected);
  });

  // it("will load account balances", async () => {
  //   //Arrange
  //   const mockRepo = new MockAccountBalanceRepository();

  //   const expected: BalanceSheets = {
  //     ["1111234522226789"]: {
  //       balance: 5000,
  //       date: "0000",
  //     },
  //     ["1111234522221234"]: {
  //       balance: 10000,
  //       date: "0000",
  //     },
  //     ["2222123433331212"]: {
  //       balance: 550,
  //       date: "0000",
  //     },
  //     ["1212343433335665"]: {
  //       balance: 1200,
  //       date: "0000",
  //     },
  //     ["3212343433335755"]: {
  //       balance: 50000,
  //       date: "0000",
  //     },
  //   };

  //   //Assert
  //   const result = await mockRepo.loadAccountBalances();

  //   //Act
  //   expect(result).toStrictEqual(expected);
  // });
});
