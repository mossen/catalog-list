export type OrderType = { value: string; label: string };
export const ORDER_OPTIONS: OrderType[] = [
  { value: "popularity", label: "Popularity" },
  { value: "new", label: "New" },
  { value: "price_high", label: "Price High to Low" },
  { value: "price_low", label: "Price Low to High" },
];
