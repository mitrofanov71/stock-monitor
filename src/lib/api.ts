import { IStockDataApi, IStockPrice } from '@/types/stock';
import { api } from '@/lib/http';

export const fetchQuotes = async (symbols: string[]) => {
  return api.get<Record<string, IStockDataApi>>('/quote', {
    symbol: symbols.join(','),
  });
};

export const fetchCurrentPrices = async (symbols: string[]) => {
  return api.get<Record<string, IStockPrice>>('/price', {
    symbol: symbols.join(','),
  });
};
