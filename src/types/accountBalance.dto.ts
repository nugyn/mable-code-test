// service returns to controller
type AccountBalanceDTO = {
  balance: number,
  date: string
}

export type BalanceSheets = Record<string, AccountBalanceDTO>;