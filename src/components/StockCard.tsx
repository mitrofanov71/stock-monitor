import React from 'react';
import { IStockData } from '@/types/stock';
import { calcChangePricePercent } from '@/lib/utils';

interface Props {
  stock: IStockData;
}

export default function StockCard({ stock }: Props) {
  const isUp = stock.price > stock.open;

  return (
    <div
      className={`rounded-xl p-4 shadow-md border ${
        isUp ? 'border-green-400' : 'border-red-400'
      }`}
    >
      <h2 className="text-xl font-semibold">{stock.symbol}</h2>
      <p className="text-lg">💲 Цена: {stock.price.toFixed(2)}</p>
      <p className={isUp ? 'text-green-600' : 'text-red-600'}>
        {isUp ? '📈 Растёт' : '📉 Падает'}
        {calcChangePricePercent(stock.open, stock.price)}
      </p>
    </div>
  );
}
