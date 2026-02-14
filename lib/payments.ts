
export const calculateSplit = (totalPrice: number | string) => {
  const numericPrice = typeof totalPrice === 'string'
    ? parseFloat(totalPrice.replace(/[^0-9.]/g, ''))
    : totalPrice;

  if (isNaN(numericPrice)) return { deposit: 0, balance: 0, total: 0 };

  const deposit = Math.round(numericPrice * 0.2 * 100) / 100;
  const balance = Math.round(numericPrice * 0.8 * 100) / 100;

  return {
    deposit,
    balance,
    total: numericPrice
  };
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2
  }).format(amount);
};
