import { useState, useEffect } from "react";
import api from "../api";
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

  const [name, setName] = useState("");
  const [saved, setSaved] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const parameters =
    functionType === "quadratic"
      ? { a, b, c }
      : functionType === "cubic"
        ? { a, b, c, d }
        : { a, b };

  const calculate = (x) => {
    if (functionType === "quadratic") return quadratic(x, a, b, c);
    if (functionType === "cubic") return cubic(x, a, b, c, d);
    return exponential(x, a, b);
  };

  const result = calculate(inputX);
  const points = createPoints(-10, 10, 0.1);
  const graphData = coordinates(points, calculate);

  async function loadExplorations() {
    try {
      const response = await api.get("/explorations");
      setSaved(response.data);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Could not load explorations.",
      );
    }
  }

  useEffect(() => {
    loadExplorations();
  }, []);

  async function saveExploration(event) {
    event.preventDefault();
    setMessage("");

    const payload = { name, functionType, parameters };

    try {
      if (editingId) {
        await api.put(`/explorations/${editingId}`, payload);
        setMessage("Exploration updated!");
      } else {
        await api.post("/explorations", payload);
        setMessage("Exploration saved!");
      }

      setName("");
      setEditingId(null);
      await loadExplorations();
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Could not save exploration.",
      );
    }
  }

  function editExploration(item) {
    setEditingId(item._id);
    setName(item.name);
    setFunctionType(item.functionType);
    setA(item.parameters.a ?? 1);
    setB(item.parameters.b ?? 1);
    setC(item.parameters.c ?? 0);
    setD(item.parameters.d ?? 0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function deleteExploration(id) {
    if (!window.confirm("Delete this exploration?")) return;

    try {
      await api.delete(`/explorations/${id}`);
      setMessage("Exploration deleted.");
      await loadExplorations();
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Could not delete exploration.",
      );
    }
  }

  return (
    <main className="function-explorer">
      <header className="explorer-header">
        <h1>Function Explorer</h1>
        <p>Experiment with functions and discover how their graphs behave.</p>
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
                onChange={(e) => setA(Number(e.target.value))}
              />
            </label>
            <label>
              b
              <input
                type="number"
                value={b}
                onChange={(e) => setB(Number(e.target.value))}
              />
            </label>

            {functionType !== "exponential" && (
              <label>
                c
                <input
                  type="number"
                  value={c}
                  onChange={(e) => setC(Number(e.target.value))}
                />
              </label>
            )}

            {functionType === "cubic" && (
              <label>
                d
                <input
                  type="number"
                  value={d}
                  onChange={(e) => setD(Number(e.target.value))}
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
              onChange={(e) => setInputX(Number(e.target.value))}
            />
            <p className="equation">
              f({inputX}) ={" "}
              {Number.isFinite(result)
                ? Number(result.toPrecision(8))
                : "Undefined"}
            </p>
          </div>

          <form onSubmit={saveExploration} className="save-form">
            <h2>{editingId ? "Edit Exploration" : "Save Exploration"}</h2>
            <label htmlFor="explorationName">Exploration name</label>
            <input
              id="explorationName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={100}
              placeholder="My quadratic function"
            />
            <button type="submit">{editingId ? "Update" : "Save"}</button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setName("");
                }}
              >
                Cancel edit
              </button>
            )}
            {message && <p role="status">{message}</p>}
          </form>
        </aside>

        <section className="graph-panel">
          <h2>Function Graph</h2>
          <FunctionGraph points={graphData} />
        </section>
      </div>

      <section className="saved-explorations">
        <h2>Saved Explorations</h2>
        {saved.length === 0 ? (
          <p>No explorations saved yet.</p>
        ) : (
          saved.map((item) => (
            <article key={item._id} className="saved-item">
              <h3>{item.name}</h3>
              <p>Function: {item.functionType}</p>
              <p>
                Parameters:{" "}
                {Object.entries(item.parameters)
                  .map(([key, value]) => `${key} = ${value}`)
                  .join(", ")}
              </p>
              <button type="button" onClick={() => editExploration(item)}>
                Edit
              </button>
              <button type="button" onClick={() => deleteExploration(item._id)}>
                Delete
              </button>
            </article>
          ))
        )}
      </section>
    </main>
  );
}

export default FunctionExplorer;
