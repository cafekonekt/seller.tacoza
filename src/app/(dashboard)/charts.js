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


export function BarChartOrders({ dashboardData }) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="space-y-0 pb-2">
        <CardDescription>Orders Today</CardDescription>
        <CardTitle className="text-4xl tabular-nums">
          {dashboardData?.todaysOrders}{" "}
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
            data={dashboardData?.orders}
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
          <span className="font-medium text-foreground">
            {dashboardData?.orders?.reduce((total, day) => total + day.orderCount, 0)}
          </span> orders.
        </CardDescription>
        <CardDescription>
          You had <span className="font-medium text-foreground">{dashboardData?.totalOrdersLastWeek}</span>{" "}
          orders last week.
        </CardDescription>
      </CardFooter>
    </Card>
  );
}

export function LineChartRevenue({ dashboardData }) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2 [&>div]:flex-1">
        <div>
          <CardDescription>Avg. Revenue</CardDescription>
          <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
            {dashboardData.averageRevenue}
            <span className="text-sm font-normal tracking-normal text-muted-foreground">
              INR
            </span>
          </CardTitle>
        </div>
        <div>
          <CardDescription>Daily Revenue</CardDescription>
          <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums">
            {dashboardData.todaysRevenue}
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
            data={dashboardData.revenue}
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
              dataKey="revenue"
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
