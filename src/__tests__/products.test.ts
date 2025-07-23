import { generatePriceHistory } from '../index';

describe('generatePriceHistory', () => {
  it('returns 30 days of price history by default', () => {
    const result = generatePriceHistory(100);
    expect(result).toHaveLength(30);
  });

  it('returns correct number of days', () => {
    const result = generatePriceHistory(50, 10);
    expect(result).toHaveLength(10);
  });

  it('prices are within ±5% of basePrice', () => {
    const basePrice = 200;
    const result = generatePriceHistory(basePrice, 20);
    result.forEach(({ price }) => {
      expect(price).toBeGreaterThanOrEqual(basePrice * 0.95);
      expect(price).toBeLessThanOrEqual(basePrice * 1.05);
    });
  });

  it('dates are ISO strings and increasing', () => {
    const result = generatePriceHistory(100, 5);
    let lastDate = new Date(result[0].date);
    result.forEach(({ date }) => {
      const d = new Date(date);
      expect(d.toISOString()).toBe(date);
      expect(d >= lastDate).toBe(true);
      lastDate = d;
    });
  });

  it('returns empty array if days = 0', () => {
    expect(generatePriceHistory(100, 0)).toEqual([]);
  });
});