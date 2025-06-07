import { BalanceSheets } from "src/types/Balances.type"
import MockAccountBalanceRepository from "./AccountBalance.repository"

describe('Account Balance Repository', () => {
    it('will get all account balances', async () => {
        //Arrange
        const mockRepo = new MockAccountBalanceRepository()

        const expected: BalanceSheets = {
          ["1111234522226789"]: {
            balance: 5000,
            date: "0000",
          },
          ["1111234522221234"]: {
            balance: 10000,
            date: "0000",
          },
          ["2222123433331212"]: {
            balance: 550,
            date: "0000",
          },
          ["1212343433335665"]: {
            balance: 1200,
            date: "0000",
          },
          ["3212343433335755"]: {
            balance: 50000,
            date: "0000",
          },
        };

        //Assert
        const result = await mockRepo.getAllAccountBalances()

        //Act
        expect(result).toStrictEqual(expected)
    })
})