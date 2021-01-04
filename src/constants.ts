export type OrderType = { value: string; name: string };
export const ORDER_OPTIONS: OrderType[] = [
  { value: "popularity", name: "Popularity" },
  { value: "new", name: "New" },
  { value: "price_high", name: "Price High to Low" },
  { value: "price_low", name: "Price Low to High" },
];
