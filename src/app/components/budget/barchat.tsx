"use client";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  YAxis,
  XAxis,
  Tooltip,
  Cell,
} from "recharts";

type details = {
  DescriptionTitle: string;
  Amount: number;
  Color: string;
};

type GraphDetailsProps = {
  budgetItem?: details[]; // Make it optional with a default value
};

export default function Barchart({ budgetItem = [] }: GraphDetailsProps) {
  return (
    <div className="w-full md:w-1/2 h-[300px] bg-white rounded-lg p-0 md:p-4 border border-gray-200">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={budgetItem}
          margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          barSize={35}
        >
          <XAxis
            dataKey="DescriptionTitle"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6b7280", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6b7280", fontSize: 12 }}
            tickFormatter={(value) => `R ${value}`}
          />
          <Tooltip
            contentStyle={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "6px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
            formatter={(value) => [`R ${value}`, "Amount"]}
            labelStyle={{ fontWeight: 500, color: "#111827" }}
          />
          <Bar dataKey="Amount" radius={[4, 4, 0, 0]}>
            {budgetItem.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.Color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
