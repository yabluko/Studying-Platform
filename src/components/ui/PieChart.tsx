"use client"
 
import { PolarGrid, RadialBar, RadialBarChart } from "recharts"
 
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
 
const chartData = [
    { status: "progress", val: 275, fill: "var(--color-progress)" },
  ]
  const chartConfig = {
    progress: {
      label: "Progress",
      color: "var(--chart-1)",
    }
  } satisfies ChartConfig

function PieChart() {
  return (
    <ChartContainer config={chartConfig} className="aspect-square">
          <RadialBarChart data={chartData} startAngle={0} endAngle={240} innerRadius={45} outerRadius={54}>
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[48.3, 41]}
            />
            <RadialBar dataKey="val" background cornerRadius={10} />
            </RadialBarChart>
    </ChartContainer>
  )
}

export default PieChart