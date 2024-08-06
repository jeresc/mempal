"use client";
import {TrendingUp} from "lucide-react";
import {Bar, BarChart, CartesianGrid, LabelList, XAxis} from "recharts";
import dayjs from "dayjs";

import {
  Card,
  CardContent,
  CardDescription,
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
import {ReviewsByDay} from "@/app/(protected)/flashcards/page";
import {useDate} from "@/lib/hooks/use-time";

const initialChartData = [
  {day: "Monday", reviews: 0},
  {day: "Tuesday", reviews: 0},
  {day: "Wednesday", reviews: 0},
  {day: "Thursday", reviews: 0},
  {day: "Friday", reviews: 0},
  {day: "Saturday", reviews: 0},
  {day: "Sunday", reviews: 0},
];

const chartConfig = {
  reviews: {
    label: "Cards",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

function ReviewCharts({reviewsByDay}: {reviewsByDay: ReviewsByDay[]}) {
  const formattedReviewsByDay = reviewsByDay.map(({day, reviews}) => {
    const formattedDay = dayjs(day).format("dddd");

    return {
      day: formattedDay,
      reviews,
    };
  });

  /* use initialChartData */
  const chartData = initialChartData.map(({day}) => {
    for (const review of formattedReviewsByDay) {
      if (review.day === day) {
        return {
          day: review.day,
          reviews: review.reviews,
        };
      } else {
        return {
          day: review.day,
          reviews: 0,
        };
      }
    }
  });

  const {wish} = useDate();

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-2xl'>{wish}</CardTitle>
        <CardDescription>Reviews by day of the week</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className='min-h-[200px] w-full' config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              axisLine={false}
              dataKey='day'
              tickFormatter={(value) => value.slice(0, 3)}
              tickLine={false}
              tickMargin={10}
            />
            <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
            <Bar dataKey='reviews' fill='var(--color-reviews)' radius={8}>
              {/*
              <LabelList className='fill-foreground' fontSize={16} offset={12} position='top' />
            */}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className='flex-col items-start gap-2 text-sm'> */}
      {/*   <div className='flex gap-2 font-medium leading-none'> */}
      {/*     Trending up by 5.2% this month <TrendingUp className='h-4 w-4' /> */}
      {/*   </div> */}
      {/*   <div className='leading-none text-muted-foreground'> */}
      {/*     Showing total visitors for the last 6 months */}
      {/*   </div> */}
      {/* </CardFooter> */}
    </Card>
  );
}

export {ReviewCharts};
