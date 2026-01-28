import { getDailyOutputs } from "@/lib/daily";
import DailyCalendar from "@/components/DailyCalendar";

export default function DailyIndexPage() {
    const dailyMap = getDailyOutputs();

    const dates = Object.keys(dailyMap);
    const countMap = Object.fromEntries(
        dates.map((d) => [d, dailyMap[d].length])
    );

    return (
        <main style={{ padding: "2rem" }}>
            <h1>Daily Output</h1>

            <DailyCalendar
                dailyDates={dates}
                dailyCountMap={countMap}
            />
        </main>
    );
}
