// service returns to controller
export type AccountBalanceDTO = {
  balance: number;
  date: string;
};

export type BalanceSheets = Record<string, AccountBalanceDTO>;
