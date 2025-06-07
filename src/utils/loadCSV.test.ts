import { loadCSV } from "./loadCSV"

describe('Load CSV File', () => {
    it('loadCSV', async () => {
        //Arrange
        const filePath = 'src/data/mable_account_balances.csv'
        const accountBalances = [
          {
            id: "1111234522226789",
            balance: 5000,
          },
          {
            id: "1111234522221234",
            balance: 10000,
          },
          {
            id: "2222123433331212",
            balance: 550,
          },
          {
            id: "1212343433335665",
            balance: 1200,
          },
          {
            id: "3212343433335755",
            balance: 50000,
          },
        ];
        //Act
        const result = await loadCSV(filePath)
        
        //Assert
        expect(result).toStrictEqual(accountBalances);
    })
})