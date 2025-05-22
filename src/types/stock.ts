export interface IStockDataApi {
  symbol: string;
  price: number;
  open: string;
  percent_change: string;
}

export interface IStockData {
  symbol: string;
  price: number;
  open: number;
  percent_change: string;
}

export interface IStockPrice {
  price: string;
}
