"use client"

import { PolarGrid, RadialBar, RadialBarChart } from "recharts"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { useEffect, useState } from "react"
import { getUserDailyProgress } from "@/actions/user";

interface UserDailyProgress {
  date: string;
  completedLessons: number;
  courses: {
    courseId: number;
    courseTitle: string;
    completedLessons: number;
  }[];
}

function PieChart() {
  const [dailyProgress, setDailyProgress] = useState(0);

  useEffect(() => {
    async function fetchDailyProgress() {
      try {
        const progress = await getUserDailyProgress();
        if (progress === null) throw new Error('Failed to fetch daily progress');

        // Get today's progress (first item in the array)
        const todayProgress = progress[0];
        if (!todayProgress) {
          setDailyProgress(0);
          return;
        }

        // Calculate total completed lessons across all courses
        const totalCompleted = todayProgress.courses.reduce(
          (sum, course) => sum + course.completedLessons,
          0
        );

        setDailyProgress(totalCompleted);
      } catch (error) {
        console.error('Error fetching daily progress:', error);
        setDailyProgress(0);
      }
    }

    fetchDailyProgress();
  }, []);

  const chartData = [
    { status: "progress", val: dailyProgress, fill: "var(--color-progress)" },
  ]

  const chartConfig = {
    progress: {
      label: `Today's Progress (${dailyProgress} lessons)`,
      color: "var(--chart-1)",
    }
  } satisfies ChartConfig

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