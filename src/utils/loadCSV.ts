import parse from "csv-parse"; // decided to use this instead to get more refined control over how I parse the csv
import fs from "fs";
import { AccountBalance } from "../types/accountBalance.model";

export const loadCSV = async function (
  filePath: string
): Promise<AccountBalance[]> {
  return new Promise((resolve, reject) => {
    // read file, parse it
    console.log("Current working directory:", process.cwd());
    const accountBalances: AccountBalance[] = [];

    const options = {
      delimiter: ",",
      from: 2, // skip csv, header
    };

    const stream = fs.createReadStream(filePath);
    const parsed = stream.pipe(parse(options));

    // event data, construct accountBalances
    parsed.on("data", (row) => {
      const [id, balance] = row // [123, 123] id, and balacne respectively, destructure

      accountBalances.push({
        id: String(id),
        balance: Number(balance),
        date: '0000'
      });
    });

    // on event error, just console log for now
    parsed.on("error", () => {
      console.error("an error occured parsing the csv");
      reject(accountBalances)
    });

    // on end of stream, just let me know
    parsed.on("end", () => {
      console.log("end of stream", accountBalances);

      resolve(accountBalances);
    });
  })

};
