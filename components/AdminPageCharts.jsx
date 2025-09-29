"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useWholeApp } from "./AuthContextAPI"

export const description = "A multiple line chart"



const chartConfig = {
  remote: {
    label: "Remote",
    color: "var(--chart-1)",
  },
  onsite: {
    label: "Onsite",
    color: "var(--chart-2)",
  },
  hybrid: {
    label: "Hybrid",
    color: "var(--chart-3)",
  },
}


export function AdminPageCharts() {
    const {internshipStats} = useWholeApp()
    // console.log(internshipStats)
 const chartData = internshipStats.map((e) => {
  const row = { year: e.year }

  e.workTypeCounts.forEach((g) => {
    row[g.workType] = g.count
  })

  return row
})

//     const chartData = [
//   { month: "January", desktop: 86, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 },
// ]
  return (
    <Card className="h-[350px] w-full">
      <CardHeader>
        <CardTitle>Work Type Trends in Internships</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            //   tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Line
          
  dataKey="Remote"
  type="monotone"
  stroke={chartConfig.remote.color}
  strokeWidth={2}
  dot
/>
<Line
  dataKey="Onsite"
  type="monotone"
  stroke={chartConfig.onsite.color}
  strokeWidth={2}
  dot
/>
<Line
  dataKey="Hybrid"
  type="monotone"
  stroke={chartConfig.hybrid.color}
  strokeWidth={2}
  dot
/>

          </LineChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              Showing total visitors for the last 6 months
            </div>
          </div>
        </div>
      </CardFooter> */}
    </Card>
  )
}
