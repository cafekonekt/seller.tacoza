"use client";
import {
  Bar,
  BarChart,
  Label,
  Rectangle,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts";
import { CartesianGrid, Line, LineChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components//ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components//ui/chart";

// Dummy data for the dashboard (Online Food Ordering Data)
const demoData = {
  orders: [
    { date: "2024-01-01", orderCount: 450 },
    { date: "2024-01-02", orderCount: 520 },
    { date: "2024-01-03", orderCount: 480 },
    { date: "2024-01-04", orderCount: 350 },
    { date: "2024-01-05", orderCount: 410 },
    { date: "2024-01-06", orderCount: 620 },
    { date: "2024-01-07", orderCount: 390 },
  ],
  revenue: [
    { date: "2024-01-01", dailyRevenue: 12300 },
    { date: "2024-01-02", dailyRevenue: 15800 },
    { date: "2024-01-03", dailyRevenue: 13800 },
    { date: "2024-01-04", dailyRevenue: 9500 },
    { date: "2024-01-05", dailyRevenue: 10500 },
    { date: "2024-01-06", dailyRevenue: 17500 },
    { date: "2024-01-07", dailyRevenue: 8900 },
  ],
};

export function BarChartOrders() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="space-y-0 pb-2">
        <CardDescription>Orders Today</CardDescription>
        <CardTitle className="text-4xl tabular-nums">
          12,584{" "}
          <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
            orders
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            orders: {
              label: "Orders",
              color: "hsl(var(--chart-1))",
            },
          }}
        >
          <BarChart
            accessibilityLayer
            margin={{
              left: -4,
              right: -4,
            }}
            data={demoData.orders}
          >
            <Bar
              dataKey="orderCount"
              fill="var(--color-orders)"
              radius={5}
              fillOpacity={0.6}
              activeBar={<Rectangle fillOpacity={0.8} />}
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={4}
              tickFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", {
                  weekday: "short",
                });
              }}
            />
            <ChartTooltip
              // defaultIndex={2}
              content={
                <ChartTooltipContent
                  hideIndicator
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    });
                  }}
                />
              }
              cursor={false}
            />
            <ReferenceLine
              y={400}
              stroke="hsl(var(--muted-foreground))"
              strokeDasharray="3 3"
              strokeWidth={1}
            >
              <Label
                position="insideBottomLeft"
                value="Average orders"
                offset={10}
                fill="hsl(var(--foreground))"
              />
              <Label
                position="insideTopLeft"
                value="450"
                className="text-lg"
                fill="hsl(var(--foreground))"
                offset={10}
                startOffset={100}
              />
            </ReferenceLine>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1">
        <CardDescription>
          Over the past 7 days, you have{" "}
          <span className="font-medium text-foreground">3,000</span> orders.
        </CardDescription>
        <CardDescription>
          You need <span className="font-medium text-foreground">2,500</span>{" "}
          more orders to reach your goal.
        </CardDescription>
      </CardFooter>
    </Card>
  );
}

export function LineChartRevenue() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2 [&>div]:flex-1">
        <div>
          <CardDescription>Avg. Revenue</CardDescription>
          <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
            12,345
            <span className="text-sm font-normal tracking-normal text-muted-foreground">
              INR
            </span>
          </CardTitle>
        </div>
        <div>
          <CardDescription>Daily Revenue</CardDescription>
          <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
            15,800
            <span className="text-sm font-normal tracking-normal text-muted-foreground">
              INR
            </span>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 items-center">
        <ChartContainer
          config={{
            revenue: {
              label: "Revenue",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="w-full"
        >
          <LineChart
            accessibilityLayer
            margin={{
              left: 14,
              right: 14,
              top: 10,
            }}
            data={demoData.revenue}
          >
            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              stroke="hsl(var(--muted-foreground))"
              strokeOpacity={0.5}
            />
            <YAxis hide domain={["dataMin - 1000", "dataMax + 1000"]} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", {
                  weekday: "short",
                });
              }}
            />
            <Line
              dataKey="dailyRevenue"
              type="natural"
              fill="var(--color-revenue)"
              stroke="var(--color-revenue)"
              strokeWidth={2}
              dot={false}
              activeDot={{
                fill: "var(--color-revenue)",
                stroke: "var(--color-revenue)",
                r: 4,
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  indicator="line"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    });
                  }}
                />
              }
              cursor={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
