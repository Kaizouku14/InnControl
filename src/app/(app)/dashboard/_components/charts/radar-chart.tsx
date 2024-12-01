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
  value: {
    label: "value",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export function VisitorDistributionChart() {
  const { data, isLoading } = api.transaction.getVisitorDistribution.useQuery();

  if (isLoading) {
    return <Skeleton className="h-[300px]" />;
  }

  return (
    <Card className="h-72">
      <CardHeader className="items-center">
        <CardTitle className="text-sm">Visitor Distribution</CardTitle>
      </CardHeader>
      <CardContent className="pb-0 ">
        <ChartContainer
          config={chartConfig}
          className="mx-auto max-h-[150px] z-20"
        >
          <RadarChart data={data?.visitor}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="month" />
            <PolarGrid />
            <Radar
              dataKey="value"
              fill="var(--color-value)"
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
          <span>{data?.isVisitorIncreased ? "increased" : "decreased"}</span> by
          <span
            className={`${data?.isVisitorIncreased? "text-green-500" : "text-red-500"}`}
          >
            {data?.visitorPercentage}%
          </span>
          this month
          {data?.isVisitorIncreased ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          Visitor Distribution Over the Past {(data && data?.visitor.length - 1 ) || 0} Months
        </div>
      </CardFooter>
    </Card>
  );
}
