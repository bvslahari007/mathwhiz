import {
  quadratic,
  cubic,
  exponential,
  createPoints,
  coordinates,
} from "./mathEngine.js";

console.log(quadratic(2, 2, 3, 1));
// Expected: 15

console.log(cubic(2, 1, 0, 0, 0));
// Expected: 8

console.log(exponential(3, 2, 2));
// Expected: 16

const points = createPoints(-2, 2, 1);
console.log(points);
// Expected: [-2, -1, 0, 1, 2]

const graphData = coordinates(points, (x) => quadratic(x, 1, 0, 0));

console.log(graphData);
// Expected:
// [
//   { x: -2, y: 4 },
//   { x: -1, y: 1 },
//   { x: 0, y: 0 },
//   { x: 1, y: 1 },
//   { x: 2, y: 4 }
// ]
