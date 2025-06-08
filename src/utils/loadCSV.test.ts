import { DataType, loadCSV } from "./loadCSV";

describe("Load CSV File", () => {
  it("loadCSV Account Balances", async () => {
    //Arrange
    const accountBalances = [
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
    //Act
    const result = await loadCSV(DataType.AccountBalance);

    //Assert
    expect(result).toStrictEqual(accountBalances);
  });

  it("loadCSV Transactions", async () => {
    //Arrange
    const transactions = [
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
    const result = await loadCSV(DataType.Transaction);

    //Assert
    expect(result).toStrictEqual(transactions);
  });
});
