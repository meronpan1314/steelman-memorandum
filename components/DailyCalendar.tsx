"use client";

import Calendar from "react-calendar";
import { useRouter } from "next/navigation";

type Props = {
    dailyDates: string[];
    dailyCountMap: Record<string, number>;
};

export default function DailyCalendar({
    dailyDates,
    dailyCountMap,
}: Props) {
    const router = useRouter();

    const hasOutput = (date: Date) => {
        const key = date.toISOString().slice(0, 10);
        return dailyDates.includes(key);
    };

    return (
        <Calendar
            onClickDay={(value) => {
                const date = value.toISOString().slice(0, 10);
                if (dailyDates.includes(date)) {
                    router.push(`/daily/${date}`);
                }
            }}
            tileContent={({ date }) => {
                const key = date.toISOString().slice(0, 10);
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
