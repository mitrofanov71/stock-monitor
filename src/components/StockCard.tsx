'use client';
import React, { useState } from 'react';
import { IStockData } from '@/types/stock';
import { calcChangePricePercent } from '@/lib/utils';
import { api } from '@/lib/http';
import StockChart from '@/components/StockChart';
import Loader from '@/components/Loader';

interface IProps {
  stock: IStockData;
}

export default function StockCard({ stock }: IProps) {
  const [showChart, setShowChart] = useState(false);
  const [chartData, setChartData] = useState<
    { datetime: string; value: number }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const isUp = stock.price > stock.open;

  const toggleChart = async () => {
    if (showChart) {
      setShowChart(false);
      return;
    }

    setLoading(true);
    try {
      const res = await api.get('/time_series', {
        symbol: stock.symbol,
        interval: '5min',
        outputsize: 30,
      });

      const rawData = res?.values || [];
      const parsed = rawData
        .map((item: any) => ({
          datetime: item.datetime,
          value: parseFloat(item.close),
        }))
        .reverse();

      setChartData(parsed);
      setShowChart(true);
    } catch (err) {
      console.error('Ошибка при загрузке графика', err);
    } finally {
      setLoading(false);
    }
  };

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
      <button
        onClick={toggleChart}
        className="text-sm text-blue-600 hover:underline"
      >
        {showChart ? 'Скрыть график' : 'Показать график'}
      </button>
      {showChart && (
        <div className="mt-4">
          {loading ? (
            <p className="text-sm text-gray-400">
              <Loader />
            </p>
          ) : (
            <StockChart data={chartData} />
          )}
        </div>
      )}
    </div>
  );
}
