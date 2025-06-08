type NewBalances = {
  senderBalance: number;
  recipientBalance: number;
};
export const calculateBalance = (
  senderBalance: number,
  recipientBalance: number,
  transferAmount: number
): NewBalances => {
  const newSenderBalance = senderBalance - transferAmount;
  const newRecipientBalance = recipientBalance + transferAmount;
  if (newSenderBalance < 0) {
    throw new Error(
      `Cannot transfer this amount to recipient, sender does not have enough balance`
    );
  }
  return {
    senderBalance: Number(newSenderBalance.toFixed(2)),
    recipientBalance: Number(newRecipientBalance.toFixed(2)),
  };
};