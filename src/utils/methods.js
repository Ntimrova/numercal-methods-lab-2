export const func = (x) => Math.pow(x, 2) * Math.cos(x);
export const intervals = [10, 20, 50, 100, 1000, 100000000];


export const analyticValue = 0.372101;

export function integrateRectangleMethod(func, a, b, n) {
  const h = (b - a) / n;
  let sum = 0;

  for (let i = 0; i < n; i++) {
    const x = a + i * h;
    sum += func(x);
  }

  return sum * h;
}

export function integrateTrapezoidalMethod(func, a, b, n) {
  const h = (b - a) / n;
  let sum = 0.5 * (func(a) + func(b));  

  for (let i = 1; i < n; i++) {
    const x = a + i * h;
    sum += func(x);
  }

  return sum * h;
}

export function integrateMonteCarloMethod(func, a, b, n) {
  let sum = 0;

  for (let i = 0; i < n; i++) {
    const x = a + Math.random() * (b - a);  // випадкова точка в межах [a, b]
    sum += func(x);
  }

  return ((b - a) / n) * sum;
}
