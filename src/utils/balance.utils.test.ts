import { Transaction } from "../types/accountBalance.model";
import { calculateBalance } from "./balance.utils";

describe("Balance Utility Functions", () => {
  it("Calculate new Balances", async () => {
    //Arrange
    const senderBalance = 1000;
    const recipientBalance = 500;
    const transferAmount = 250;

    //Act
    const result = calculateBalance(
      senderBalance,
      recipientBalance,
      transferAmount
    );

    //Assert
    expect(result).toStrictEqual({
      recipientBalance: 750,
      senderBalance: 750,
    });
  });

  it("Calculate new Balances fixed two decimal places", async () => {
    //Arrange
    const senderBalance = 1000.55;
    const recipientBalance = 500.34
    const transferAmount = 250.12;

    //Act
    const result = calculateBalance(
      senderBalance,
      recipientBalance,
      transferAmount
    );

    //Assert
    expect(result).toStrictEqual({
      recipientBalance: 750.46,
      senderBalance: 750.43,
    });
  });

  it("Calculate new Balances with csv data", async () => {
    //Arrange
    const accountBalances = [{
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
    ]
    const transactions: Transaction[]= [
        {
          recipientId: "1212343433335665",
          senderId: "1111234522226789",
          amount: 500.0,
        },
        {
          recipientId: "2222123433331212",
          senderId: "3212343433335755",
          amount: 1000.0,
        },
        {
          recipientId: "1111234522226789",
          senderId: "3212343433335755",
          amount: 320.5,
        },
        {
          recipientId: "1212343433335665",
          senderId: "1111234522221234",
          amount: 25.6,
        },
      ];

    //Act

    for(const transaction of transactions) {
      const { recipientId, senderId, amount } = transaction;
      const recipientAccount = accountBalances.find(
        (acc) => acc.id === recipientId
      );
      const senderAccount = accountBalances.find((acc) => acc.id === senderId);
      if (!senderAccount || !recipientAccount) {
        throw new Error("Error in test cases");
      }
      const result = calculateBalance(senderAccount.balance, recipientAccount.balance, amount);
      //Assert
      expect(result).toBeTruthy()
    }

    
  });

  it("will throw error if sender does not have enough balance", async () => {
    //Arrange
    const senderBalance = 250;
    const recipientBalance = 500;
    const transferAmount = 500;

    //Act
    const result = () => {
      calculateBalance(senderBalance, recipientBalance, transferAmount);
    };

    //Assert
    expect(result).toThrow(
      "Cannot transfer this amount to recipient, sender does not have enough balance"
    );
  });
});
