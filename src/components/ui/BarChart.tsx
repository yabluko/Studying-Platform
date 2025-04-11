'use client'
import React from 'react'
import {
    type ChartConfig,
    ChartContainer,
  } from "@/components/ui/chart"
import { Bar, BarChart } from 'recharts'

const chartData = [
    {  data1: 186, data2: 80, data3: 20, data4: 40 },
    {  data1: 305, data2: 200, data3: 15, data4: 60 },
    {  data1: 237, data2: 120, data3: 20, data4: 40 },
    {  data1: 73, data2: 190, data3: 90, data4: 120},
    {  data1: 209, data2: 130, data3: 234, data4: 87 },
  ]
  
const chartConfig = {
    data1: {
      label: "Data1",
      color: "var(--chart-1)",
    },
    data2: {
      label: "Data2",
      color: "var(--chart-3)",
    },
    data3: {
        label: "Data3",
        color: "var(--chart-4)",
      },
    data4: {
        label: "Data4",
        color: "var(--chart-5)",
      },

  } satisfies ChartConfig

function BarChartComponent() {


  return (
    <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            {/* <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            /> */}
            {/* <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} /> */}
            <Bar dataKey="data1" stackId="a" fill="var(--color-data1)" radius={[0, 0, 0, 0]} />
            <Bar dataKey="data2" stackId="a" fill="var(--color-data2)" radius={[0, 0, 0, 0]} />
            <Bar dataKey="data3" stackId="a" fill="var(--color-data3)" radius={[0, 0, 0, 0]} />
            <Bar dataKey="data4" stackId="a" fill="var(--color-data4)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
  )
}

export default BarChartComponent