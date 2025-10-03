"use client";
import { ResponsiveContainer, Cell, Pie, PieChart } from "recharts";

type details = {
  DescriptionTitle: string;
  Amount: number;
  Color: string;
};

type GraphDetailsProps = {
  amount: number;
  budgetItem?: details[]; // Make it optional with a default value
};

export default function Piechart({
  budgetItem = [],
  amount,
}: GraphDetailsProps) {
  return (
    <div className="flex items-center justify-center w-full md:w-1/2 h-[300px] md:h-full">
      <div className="w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={budgetItem}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={85}
              paddingAngle={5}
              dataKey="Amount"
            >
              {budgetItem.map((entry) => (
                <Cell
                  key={`cell-${entry.DescriptionTitle}`}
                  fill={entry.Color}
                />
              ))}
            </Pie>

            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={16}
              fontWeight="bold"
              fill="#333"
            >
              R {amount}
            </text>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
