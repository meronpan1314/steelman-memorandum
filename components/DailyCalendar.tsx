"use client";

import Calendar from "react-calendar";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

type Props = {
    dailyDates: string[];
    dailyCountMap: Record<string, number>;
};

// Helper to format date as YYYY-MM-DD in local time
const formatLocalDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

export default function DailyCalendar({
    dailyDates,
    dailyCountMap,
}: Props) {
    const router = useRouter();

    const hasOutput = (date: Date) => {
        const key = formatLocalDate(date);
        return dailyDates.includes(key);
    };

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <Calendar
            locale="ja-JP"
            onClickDay={(value) => {
                const date = formatLocalDate(value);
                if (dailyDates.includes(date)) {
                    router.push(`/daily/${date}`);
                }
            }}
            tileContent={({ date }) => {
                const key = formatLocalDate(date);
                const count = dailyCountMap[key];

                return count ? (
                    <div style={{ fontSize: "0.7rem" }}>✔︎ {count}</div>
                ) : null;
            }}
            tileClassName={({ date }) =>
                hasOutput(date) ? "has-output" : undefined
            }
        />
    );
}
