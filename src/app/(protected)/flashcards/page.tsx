"use client";

import {useEffect, useState} from "react";

import {ReviewCharts} from "~/review/components/review-charts";
import {useReviews} from "~/review/hooks/use-reviews";

export interface ReviewsByDay {
  day: string;
  reviews: number;
}

export default function FlashcardsPage() {
  const {reviews} = useReviews();
  const [reviewsByDay, setReviewsByDay] = useState<ReviewsByDay[]>([]);

  useEffect(() => {
    const reviewsByDay = reviews.reduce<Record<string, number>>((acc, review) => {
      const day = review.dueAt.toDateString();

      if (acc[day] === undefined) acc[day] = 0;

      acc[day] += 1;

      return acc;
    }, {});

    const reviewsByDayArray = Object.entries(reviewsByDay).map(([day, reviews]) => ({
      day,
      reviews,
    }));

    setReviewsByDay(reviewsByDayArray);
  }, [reviews]);

  return (
    <section className='flex w-full flex-col gap-4 p-4'>
      <ReviewCharts reviewsByDay={reviewsByDay} />
    </section>
  );
}
