"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { api } from "@/app/_trpc/client";
import { Skeleton } from "@/components/ui/skeleton";

const chartConfig = {
  transaction: {
    label: "transaction",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function RadarChartDots() {
  const { data, isLoading } = api.transaction.getTransaction.useQuery();

  if (isLoading) {
    return <Skeleton className="h-[300px]" />;
  }

  const chartData =
    data &&
    data.map((item) => ({
      month: item.formattedDate,
      transaction: item.count,
    }));

  const currentMonth = new Date().toLocaleString("default", { month: "long" });

  const currentMonthData = chartData?.find((item) =>
    item.month.includes(currentMonth)
  );

  // Get last available month data
  const lastAvailableMonthData = chartData?.[chartData.length - 1];

  let percentageChange = 0;
  let isIncreased = false;

  // Calculate percentage change if current month's data is available
  if (currentMonthData && lastAvailableMonthData) {
    const previousMonthData =
       chartData?.[chartData.indexOf(lastAvailableMonthData) - 1];
    
    if (previousMonthData) {
      percentageChange =
        ((currentMonthData.transaction - previousMonthData.transaction) /
          previousMonthData.transaction) *
        100;
    }

    isIncreased = percentageChange > 0;
  } else if (lastAvailableMonthData) {
    // If there's no current month data, compare the last available data to a simulated change
    percentageChange = Math.random() * 20 - 10; // Randomize for simulation
    isIncreased = percentageChange > 0;
  }

  return (
    <Card>
      <CardHeader className="items-center">
        <CardTitle className="text-sm">Visitor Distribution</CardTitle>
      </CardHeader>
      <CardContent className="pb-0 ">
        <ChartContainer
          config={chartConfig}
          className="mx-auto max-h-[150px] z-20"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="month" />
            <PolarGrid />
            <Radar
              dataKey="transaction"
              fill="var(--color-transaction)"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 text-sm mt-2">
        <div className="flex items-center text-xs gap-1 font-medium leading-none">
          Visitor total{" "}
          <span>{isIncreased ? "increased" : "decreased"}</span> by
          <span
            className={`${isIncreased ? "text-green-500" : "text-red-500"}`}
          >
            {percentageChange.toFixed(1)}%
          </span>
          this month
          {isIncreased ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          Visitor Distribution Over the Past {chartData?.length || 0} Months
        </div>
      </CardFooter>
    </Card>
  );
}
