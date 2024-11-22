"use client";

import { api } from "@/app/_trpc/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Line, LineChart } from "recharts";

const chartConfig = {
  revenue: {
    label: "Revenue",
    theme: {
      light: "black",
      dark: "white",
    },
  },
} satisfies ChartConfig;

export function TotalRevenueChart() {
  const { data } = api.transaction.getTotalRevenue.useQuery();

  return (
    <Card className="h-44 ">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-normal">Total Revenue</CardTitle>
      </CardHeader>
      <CardContent className="pb-0">
        <div className="text-2xl font-bold">{data?.currentMonthValue}</div>
        <p className="text-xs text-muted-foreground">
          {data?.isIncreased ? "+" : "-"}
          {data?.calculatedPercentage}% from last month
        </p>
        <ChartContainer config={chartConfig} className="h-[50px] w-full">
          <LineChart
            data={data?.data}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 0,
            }}
          >
            <Line
              type="monotone"
              strokeWidth={2}
              dataKey="revenue"
              activeDot={{
                r: 6,
                fill: "var(--color-revenue)",
              }}
              stroke="var(--color-revenue)"
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}