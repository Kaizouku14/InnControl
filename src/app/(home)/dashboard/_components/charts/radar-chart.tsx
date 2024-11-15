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

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 273 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function RadarChartDots() {
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
              dataKey="desktop"
              fill="var(--color-desktop)"
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
          Visitor total <span>{false ? "increased" : "decreased"}</span> by
          <span className={`${false ? "text-primary" : "text-red-500 "}`}>
            {"5.2"}% 
          </span>this month
          {false ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
        </div>
        <div className="leading-none text-muted-foreground">
          Visitor Distribution Over the Past {"6"} Months
        </div>
      </CardFooter>
    </Card>
  );
}
