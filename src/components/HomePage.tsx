'use client';
import React, { useEffect, useState, useMemo } from 'react';
import { fetchCurrentPrices, fetchQuotes } from '@/lib/api';
import StockCard from '@/components/StockCard';
import Header from '@/components/Header';
import { IStockData } from '@/types/stock';
import Loader from '@/components/Loader';
import { STOCKS_SYMBOLS, UPDATE_INTERVAL } from '@/constants/stock';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [stocks, setStocks] = useState<IStockData[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'up' | 'down'>('all');

  const updatePrice = async () => {
    try {
      const prices = await fetchCurrentPrices(STOCKS_SYMBOLS);
      setStocks((prev) =>
        prev.map((el) => ({
          ...el,
          price: parseFloat(prices[el.symbol].price) || el.price,
        }))
      );
    } catch (err) {
      console.error('Ошибка загрузки:', err);
    }
  };

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchQuotes(STOCKS_SYMBOLS);
      const prices = await fetchCurrentPrices(STOCKS_SYMBOLS);
      const mappedStocks = Object.values(data).map((el) => ({
        symbol: el.symbol,
        price: parseFloat(prices[el.symbol].price) || 0,
        open: parseFloat(el.open),
        percent_change: el.percent_change,
      }));
      setStocks(mappedStocks);
    } catch (err) {
      console.error('Ошибка загрузки:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(updatePrice, UPDATE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const filtered = useMemo(() => {
    return stocks.filter((stock) => {
      const match = stock.symbol?.toLowerCase().includes(search.toLowerCase());
      if (filter === 'up') return match && stock.price > stock.open;
      if (filter === 'down') return match && stock.price < stock.open;
      return match;
    });
  }, [stocks, search, filter]);

  return (
    <main className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Биржевой монитор</h1>
      <Header
        search={search}
        onSearch={setSearch}
        filter={filter}
        onSetFilter={setFilter}
      />

      {isLoading ? (
        <Loader />
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 items-start">
          {filtered.map((stock) => (
            <StockCard key={stock.symbol} stock={stock} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-gray-500 py-12">
          <p className="text-center text-sm">Нет данных для отображения</p>
        </div>
      )}
    </main>
  );
}
