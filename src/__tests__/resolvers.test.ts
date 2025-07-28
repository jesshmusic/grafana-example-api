import { products } from '../products';
import { resolvers } from '../index';

describe('resolvers.Query.products', () => {
  it('returns all products with historicalPrices', () => {
    const result = resolvers.Query.products({}, { limit: 30 });
    expect(result).toHaveLength(products.length);
    result.forEach((prod, i) => {
      expect(prod.id).toBe(products[i].id);
      expect(Array.isArray(prod.historicalPrices)).toBe(true);
      expect(prod.historicalPrices).toHaveLength(30);
    });
  });
});

describe('resolvers.Query.product', () => {
  it('returns the correct product by id', () => {
    const prod = products[0];
    const result = resolvers.Query.product(null, { id: prod.id });
    expect(result).not.toBeNull();
    if (result) {
      expect(result.id).toBe(prod.id);
      expect(Array.isArray(result.historicalPrices)).toBe(true);
      expect(result.historicalPrices).toHaveLength(30);
    }
  });


  it('returns null if product is not found', () => {
    expect(resolvers.Query.product(null, { id: 9999 })).toBeNull();
  });
});
