import { useState } from "react";
import {
  quadratic,
  cubic,
  exponential,
  createPoints,
  coordinates,
} from "../utils/mathEngine.js";
import FunctionGraph from "../components/FunctionGraph.jsx";

function FunctionExplorer() {
  const [functionType, setFunctionType] = useState("quadratic");

  const [a, setA] = useState(1);
  const [b, setB] = useState(1);
  const [c, setC] = useState(0);
  const [d, setD] = useState(0);

  const [inputX, setInputX] = useState(2);

  const calculate = (x) => {
    if (functionType === "quadratic") {
      return quadratic(x, a, b, c);
    }

    if (functionType === "cubic") {
      return cubic(x, a, b, c, d);
    }

    return exponential(x, a, b);
  };

  const result = calculate(inputX);

  const points = createPoints(-10, 10, 0.1);
  const graphData = coordinates(points, calculate);

  return (
    <main className="function-explorer">
      <header className="explorer-header">
        <h1>Function Explorer</h1>
        <p>
          Choose a function, experiment with its parameters, and discover how
          its graph behaves.
        </p>
      </header>

      <div className="function-selector">
        <label htmlFor="functionType">Function family</label>

        <select
          id="functionType"
          value={functionType}
          onChange={(event) => setFunctionType(event.target.value)}
        >
          <option value="quadratic">Quadratic</option>
          <option value="cubic">Cubic</option>
          <option value="exponential">Exponential</option>
        </select>
      </div>

      <div className="explorer-layout">
        <aside className="parameter-panel">
          <h2>Function Parameters</h2>

          <div className="coefficient-controls">
            <label>
              a
              <input
                type="number"
                value={a}
                onChange={(event) => setA(Number(event.target.value))}
              />
            </label>

            <label>
              b
              <input
                type="number"
                value={b}
                onChange={(event) => setB(Number(event.target.value))}
              />
            </label>

            {functionType !== "exponential" && (
              <label>
                c
                <input
                  type="number"
                  value={c}
                  onChange={(event) => setC(Number(event.target.value))}
                />
              </label>
            )}

            {functionType === "cubic" && (
              <label>
                d
                <input
                  type="number"
                  value={d}
                  onChange={(event) => setD(Number(event.target.value))}
                />
              </label>
            )}
          </div>

          <div className="evaluation-panel">
            <h2>Evaluate Function</h2>

            <label htmlFor="inputX">Input x</label>

            <input
              id="inputX"
              type="number"
              value={inputX}
              onChange={(event) => setInputX(Number(event.target.value))}
            />

            <p className="equation">
              f({inputX}) ={" "}
              {Number.isFinite(result)
                ? Number(result.toPrecision(8))
                : "Undefined"}
            </p>
          </div>
        </aside>

        <section className="graph-panel">
          <h2>Function Graph</h2>

          <FunctionGraph points={graphData} />
        </section>
      </div>
    </main>
  );
}

export default FunctionExplorer;
