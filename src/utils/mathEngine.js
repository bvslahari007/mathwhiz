/**
 * MathWhiz — Mathematical Engine
 * Supports quadratic, cubic, and exponential functions.
 */

/**
 * Quadratic function: f(x) = ax² + bx + c
 */
export function quadratic(x, a, b, c) {
  return a * x ** 2 + b * x + c;
}

/**
 * Cubic function: f(x) = ax³ + bx² + cx + d
 */
export function cubic(x, a, b, c, d) {
  return a * x ** 3 + b * x ** 2 + c * x + d;
}

/**
 * Exponential function: f(x) = a * bˣ
 * For real-valued functions with arbitrary real x, b must be positive.
 */
export function exponential(x, a, b) {
  if (b <= 0) {
    return NaN;
  }

  return a * b ** x;
}

/**
 * Generates x-values for graph plotting.
 *
 * @param {number} minX - Minimum x-value.
 * @param {number} maxX - Maximum x-value.
 * @param {number} step - Positive interval between points.
 * @returns {number[]} Array of x-values.
 */
export function createPoints(minX, maxX, step) {
  if (
    !Number.isFinite(minX) ||
    !Number.isFinite(maxX) ||
    !Number.isFinite(step) ||
    step <= 0 ||
    minX > maxX
  ) {
    throw new Error(
      "Invalid range or step size. Provide finite bounds and a positive step.",
    );
  }

  const points = [];
  const estimatedCount = Math.floor((maxX - minX) / step) + 1;

  if (!Number.isSafeInteger(estimatedCount) || estimatedCount > 10000) {
    throw new Error(
      "Too many graph points. Increase the step size or reduce the range.",
    );
  }

  for (let i = 0; i < estimatedCount; i++) {
    const x = minX + i * step;

    if (x > maxX + step * 1e-9) {
      break;
    }

    points.push(Number(x.toFixed(10)));
  }

  return points;
}

/**
 * Converts x-values into graph coordinates.
 *
 * Non-finite y-values become null so invalid calculations
 * do not introduce Infinity or NaN into the graph.
 *
 * @param {number[]} points - Input x-values.
 * @param {(x: number) => number} func - Function to evaluate.
 * @returns {{ x: number, y: number | null }[]} Graph coordinates.
 */
export function coordinates(points, func) {
  if (!Array.isArray(points) || typeof func !== "function") {
    throw new TypeError(
      "coordinates() expects an array of points and a function.",
    );
  }

  return points.map((x) => {
    const y = func(x);

    return {
      x,
      y: Number.isFinite(y) ? y : null,
    };
  });
}
