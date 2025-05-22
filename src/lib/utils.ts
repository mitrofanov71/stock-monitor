export const calcChangePricePercent = (openPrice: number, currentPrice) => {
  if (!openPrice || isNaN(openPrice) || isNaN(currentPrice)) return '—';
  const change = ((currentPrice - openPrice) / openPrice) * 100;
  const rounded = change.toFixed(2);
  return `${change > 0 ? '+' : ''}${rounded}%`;
};
