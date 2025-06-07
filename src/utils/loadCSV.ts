import parse from "csv-parse"; // decided to use this instead to get more refined control over how I parse the csv
import fs from "fs";
import { AccountBalance, Transaction } from "../types/accountBalance.model";
export enum DataType {
  AccountBalance,
  Transaction,
}

export const loadCSV = async function (
  data: DataType
): Promise<AccountBalance[] | Transaction[]> {
  return new Promise((resolve, reject) => {
    // read file, parse it
    const options = {
      delimiter: ",",
      from: 2, // skip csv, header
    };

    console.log("Current working directory:", process.cwd());
    if (data === DataType.Transaction) {
      const transactions: Transaction[] = [];

      const stream = fs.createReadStream(
        process.env.TRANSACTION_FILE_PATH || ""
      );
      const parsed = stream.pipe(parse(options));

      // event data, construct accountBalances
      parsed.on("data", (row) => {
        const [recipientId, senderId, amount] = row; // [123, 123] id, and balacne respectively, destructure

        transactions.push({
          recipientId: String(recipientId),
          senderId: String(senderId),
          amount: Number(amount),
        });
      });

      // on event error, just console log for now
      parsed.on("error", () => {
        console.error("an error occured parsing the csv");
        reject(transactions);
      });

      // on end of stream, just let me know
      parsed.on("end", () => {
        console.log("end of stream", transactions);

        resolve(transactions);
      });
      return;
    } else {
      const accountBalances: AccountBalance[] = [];

      const stream = fs.createReadStream(
        process.env.ACCOUNT_BALANCE_FILE_PATH || ""
      );
      const parsed = stream.pipe(parse(options));

      // event data, construct accountBalances
      parsed.on("data", (row) => {
        const [id, balance] = row; // [123, 123] id, and balacne respectively, destructure

        accountBalances.push({
          id: String(id),
          balance: Number(balance),
          date: "0000",
        });
      });

      // on event error, just console log for now
      parsed.on("error", () => {
        console.error("an error occured parsing the csv");
        reject(accountBalances);
      });

      // on end of stream, just let me know
      parsed.on("end", () => {
        console.log("end of stream", accountBalances);

        resolve(accountBalances);
      });
    }
  });
};
