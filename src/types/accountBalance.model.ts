// repository representation of database items
import mongoose from "mongoose";

export interface AccountBalance {
  id: string;
  balance: number;
  date: string;
}

// May eventually have db for this
export interface Transaction {
  recipientId: string;
  senderId: string;
  amount: number;
}

const accountBalanceSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  balance: { type: Number, required: true },
  date: { type: String, required: true },
});

export const AccountBalanceModel = mongoose.model(
  "AccountBalance",
  accountBalanceSchema
);
