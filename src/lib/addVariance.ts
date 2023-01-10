/**
 * Returns num plus/minus variance
 * @param num
 * @param variance
 * @returns num +- variance
 */
export const addVariance = (num: number, variance: number) =>
  num + (Math.floor(Math.random() * variance * 2) - variance);
