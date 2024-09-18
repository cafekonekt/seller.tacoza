"use client";
import {
  Bar,
  BarChart,
  Label,
  LabelList,
  Line,
  LineChart,
  Rectangle,
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";

// Data for charts
const orderData = [
  { date: "2024-08-25", orders: 30 },
  { date: "2024-08-26", orders: 40 },
  { date: "2024-08-27", orders: 50 },
  { date: "2024-08-28", orders: 60 },
  { date: "2024-08-29", orders: 70 },
  { date: "2024-08-30", orders: 80 },
  { date: "2024-08-31", orders: 90 },
];

const revenueData = [
  { date: "2024-08-25", revenue: 3000 },
  { date: "2024-08-26", revenue: 3200 },
  { date: "2024-08-27", revenue: 3100 },
  { date: "2024-08-28", revenue: 3300 },
  { date: "2024-08-29", revenue: 3400 },
  { date: "2024-08-30", revenue: 3500 },
  { date: "2024-08-31", revenue: 3600 },
];

const monthlyRevenueData = [
  { month: "Jan", revenue: 500 },
  { month: "Feb", revenue: 600 },
  { month: "Mar", revenue: 700 },
  { month: "Apr", revenue: 800 },
  { month: "May", revenue: 900 },
  { month: "Jun", revenue: 1000 },
  { month: "Jul", revenue: 1100 },
  { month: "Aug", revenue: 1200 },
  { month: "Sep", revenue: 1300 },
  { month: "Oct", revenue: 1400 },
  { month: "Nov", revenue: 1500 },
  { month: "Dec", revenue: 1600 },
];

const salesData = [
  { name: "Breakfast", value: 400 },
  { name: "Main Course", value: 300 },
  { name: "Chinese", value: 200 },
];

// Data for top-selling items with different time ranges
const topSellingData = {
  last30Days: [
    { item: "Item A", sales: 500 },
    { item: "Item B", sales: 400 },
    { item: "Item C", sales: 300 },
  ],
  last365Days: [
    { item: "Item A", sales: 5000 },
    { item: "Item B", sales: 4000 },
    { item: "Item C", sales: 3000 },
  ],
  overall: [
    { item: "Item A", sales: 10000 },
    { item: "Item B", sales: 8000 },
    { item: "Item C", sales: 6000 },
  ],
};

export function Charts() {
  const [filter, setFilter] = useState("last30Days");

  return (
    <div className="chart-wrapper mx-auto flex flex-col flex-wrap items-start justify-center gap-6 p-6 sm:p-8">
      <div className="grid w-full gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        <Card className="flex flex-col" x-chunk="charts-01-chunk-0">
          <CardHeader className="space-y-0 pb-2">
            <CardDescription>Orders Today</CardDescription>
            <CardTitle className="text-3xl tabular-nums">
              350{" "}
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
                  left: 0,
                  right: 0,
                  top: 10,
                  bottom: 0,
                }}
                data={orderData}
              >
                <Bar
                  dataKey="orders"
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
                  defaultIndex={2}
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
                  y={60}
                  stroke="hsl(var(--muted-foreground))"
                  strokeDasharray="3 3"
                  strokeWidth={1}
                >
                  <Label
                    position="insideBottomLeft"
                    value="Average Orders"
                    offset={10}
                    fill="hsl(var(--foreground))"
                  />
                  <Label
                    position="insideTopLeft"
                    value="60"
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
              Over the past 7 days, you have had{" "}
              <span className="font-medium text-foreground">450</span> orders.
            </CardDescription>
            <CardDescription>
              You need <span className="font-medium text-foreground">350</span>{" "}
              more orders to reach your goal.
            </CardDescription>
          </CardFooter>
        </Card>
        <Card className="flex flex-col" x-chunk="charts-01-chunk-1">
          <CardHeader className="flex flex-col space-y-2 pb-2">
            <div>
              <CardDescription>Average Revenue</CardDescription>
              <CardTitle className="text-3xl tabular-nums">
                ₹3,200
                <span className="text-sm font-normal tracking-normal text-muted-foreground">
                  INR
                </span>
              </CardTitle>
            </div>
            <div>
              <CardDescription>Daily Revenue</CardDescription>
              <CardTitle className="text-3xl tabular-nums">
                ₹450
                <span className="text-sm font-normal tracking-normal text-muted-foreground">
                  INR
                </span>
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex flex-1">
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
                  left: 0,
                  right: 0,
                  top: 10,
                  bottom: 0,
                }}
                data={revenueData}
              >
                <CartesianGrid
                  strokeDasharray="4 4"
                  vertical={false}
                  stroke="hsl(var(--muted-foreground))"
                  strokeOpacity={0.5}
                />
                <YAxis hide domain={["dataMin - 100", "dataMax + 100"]} />
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
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--color-revenue)"
                  strokeWidth={2}
                  dot={false}
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
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      <div className="w-full flex flex-col gap-6">
        <Card className="flex flex-col" x-chunk="charts-01-chunk-2">
          <CardHeader className="flex flex-col space-y-2 pb-2">
            <CardDescription>Monthly Revenue</CardDescription>
            <CardTitle className="text-3xl tabular-nums">
              ₹12,000{" "}
              <span className="text-sm font-normal tracking-normal text-muted-foreground">
                INR
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="w-full">
            <ChartContainer
              config={{
                monthlyRevenue: {
                  label: "Monthly Revenue",
                  color: "hsl(var(--chart-1))",
                },
              }}
            >
              <BarChart
                accessibilityLayer
                margin={{
                  left: 0,
                  right: 0,
                  top: 10,
                  bottom: 0,
                }}
                data={monthlyRevenueData}
                className="w-full"
              >
                <Bar
                  dataKey="revenue"
                  fill="var(--color-monthly-revenue)"
                  radius={5}
                >
                  <LabelList
                    dataKey="revenue"
                    position="top"
                    fill="hsl(var(--foreground))"
                  />
                </Bar>
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={4}
                />
                <YAxis hide domain={["dataMin - 100", "dataMax + 100"]} />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      indicator="bar"
                      labelFormatter={(value) => {
                        return `Month: ₹{value}`;
                      }}
                    />
                  }
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="flex flex-col" x-chunk="charts-01-chunk-3">
          <CardHeader className="flex flex-col space-y-2 pb-2">
            <CardDescription>Sales Distribution</CardDescription>
            <CardTitle>Distribution of sales by product category.</CardTitle>
          </CardHeader>
          <CardContent className="w-full">
            <ChartContainer
              config={{
                sales: {
                  label: "Sales",
                  color: "hsl(var(--chart-1))",
                },
              }}
            >
              <PieChart width={800} height={400}>
                <Pie
                  data={salesData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  fill="var(--color-sales)"
                  label
                >
                  {salesData.map((entry, index) => (
                    <Cell
                      key={`cell-₹{index}`}
                      fill={`hsl(var(--chart-₹{index + 1}))`}
                    />
                  ))}
                </Pie>
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      indicator="pie"
                      labelFormatter={(value) => {
                        return `Category: ₹{value}`;
                      }}
                    />
                  }
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="flex flex-col" x-chunk="charts-01-chunk-4">
          <CardHeader>
            <CardTitle>Top Selling Items</CardTitle>
            <CardDescription>Filter by time range</CardDescription>
            <div className="flex gap-4">
              <label htmlFor="timeRange">Time Range: </label>

              <Select
                id="timeRange"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Time Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last30Days">Last 30 Days</SelectItem>
                  <SelectItem value="last365Days">Last Year</SelectItem>
                  <SelectItem value="overall">Overall</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="w-full">
            <ChartContainer
              config={{
                topSelling: {
                  label: "Top Selling Items",
                  color: "hsl(var(--chart-1))",
                },
              }}
            >
              <BarChart
                accessibilityLayer
                margin={{
                  left: 0,
                  right: 0,
                  top: 10,
                  bottom: 0,
                }}
                data={topSellingData[filter]}
              >
                <Bar dataKey="sales" fill="var(--color-top-selling)" radius={5}>
                  <LabelList
                    dataKey="sales"
                    position="top"
                    fill="hsl(var(--foreground))"
                  />
                </Bar>
                <XAxis
                  dataKey="item"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={4}
                />
                <YAxis hide domain={["dataMin - 100", "dataMax + 100"]} />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      indicator="bar"
                      labelFormatter={(value) => {
                        return `Item: ₹{value}`;
                      }}
                    />
                  }
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid w-full gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        <Card className="flex flex-col" x-chunk="charts-01-chunk-0">
          <CardHeader className="space-y-0 pb-2">
            <CardDescription>Orders Today</CardDescription>
            <CardTitle className="text-3xl tabular-nums">
              350{" "}
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
                  left: 0,
                  right: 0,
                  top: 10,
                  bottom: 0,
                }}
                data={orderData}
              >
                <Bar
                  dataKey="orders"
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
                  defaultIndex={2}
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
                  y={60}
                  stroke="hsl(var(--muted-foreground))"
                  strokeDasharray="3 3"
                  strokeWidth={1}
                >
                  <Label
                    position="insideBottomLeft"
                    value="Average Orders"
                    offset={10}
                    fill="hsl(var(--foreground))"
                  />
                  <Label
                    position="insideTopLeft"
                    value="60"
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
              Over the past 7 days, you have had{" "}
              <span className="font-medium text-foreground">450</span> orders.
            </CardDescription>
            <CardDescription>
              You need <span className="font-medium text-foreground">350</span>{" "}
              more orders to reach your goal.
            </CardDescription>
          </CardFooter>
        </Card>
        <Card className="flex flex-col" x-chunk="charts-01-chunk-1">
          <CardHeader className="flex flex-col space-y-2 pb-2">
            <div>
              <CardDescription>Average Revenue</CardDescription>
              <CardTitle className="text-3xl tabular-nums">
                ₹3,200
                <span className="text-sm font-normal tracking-normal text-muted-foreground">
                  INR
                </span>
              </CardTitle>
            </div>
            <div>
              <CardDescription>Daily Revenue</CardDescription>
              <CardTitle className="text-3xl tabular-nums">
                ₹450
                <span className="text-sm font-normal tracking-normal text-muted-foreground">
                  INR
                </span>
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex flex-1">
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
                  left: 0,
                  right: 0,
                  top: 10,
                  bottom: 0,
                }}
                data={revenueData}
              >
                <CartesianGrid
                  strokeDasharray="4 4"
                  vertical={false}
                  stroke="hsl(var(--muted-foreground))"
                  strokeOpacity={0.5}
                />
                <YAxis hide domain={["dataMin - 100", "dataMax + 100"]} />
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
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--color-revenue)"
                  strokeWidth={2}
                  dot={false}
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
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
