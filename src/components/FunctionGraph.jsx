import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";

function FunctionGraph({ points }) {
  return (
    <div className="graph-container">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={points}
          margin={{ top: 10, right: 12, bottom: 8, left: 0 }}
        >
          <CartesianGrid stroke="#d5d7c7" strokeDasharray="3 3" />

          <XAxis
            dataKey="x"
            type="number"
            domain={["auto", "auto"]}
            tickCount={7}
            tick={{ fill: "#26364b", fontSize: 11 }}
          />

          <YAxis
            domain={["auto", "auto"]}
            tickCount={5}
            width={42}
            tick={{ fill: "#26364b", fontSize: 11 }}
          />

          <ReferenceLine y={0} stroke="#555852" />
          <ReferenceLine x={0} stroke="#555852" />

          <Tooltip
            contentStyle={{
              backgroundColor: "#f4f4e9",
              border: "1px solid #b7bba9",
              borderRadius: "6px",
              fontSize: "12px",
            }}
            labelFormatter={(value) => `x = ${value}`}
            formatter={(value) => [value, "f(x)"]}
          />

          <Line
            type="monotone"
            dataKey="y"
            name="f(x)"
            stroke="#163156"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default FunctionGraph;
