"use client";

import { api } from "@/app/_trpc/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Line, LineChart } from "recharts";

const chartConfig = {
  value: {
    label: "value",
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
        <div className="text-2xl font-bold">
          &#8369; {data?.revenue[1].value}
        </div>
        <p className="text-xs text-muted-foreground">
          {data?.isRevenueIncreased ? "+" : "-"}
          {data?.revenuePercentage}% from last month
        </p>
        <ChartContainer config={chartConfig} className="h-[50px] w-full">
          <LineChart
            data={data?.revenue}
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
              dataKey="value"
              activeDot={{
                r: 6,
                fill: "var(--color-value)",
              }}
              stroke="var(--color-value)"
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
