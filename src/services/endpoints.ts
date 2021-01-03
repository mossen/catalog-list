export const productsEndpoint = (sort: string, page: number): string => {
  return `https://eve.theiconic.com.au/catalog/products?gender=female&page=${page}&page_size=10&sort=${sort}`;
};
