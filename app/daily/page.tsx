import { getDailyOutputs } from "@/lib/daily";
import { getAllMarkdownMeta } from "@/lib/markdown";
import DailyCalendar from "@/components/DailyCalendar";
import Link from "next/link";

export default function DailyIndexPage() {
    const dailyMap = getDailyOutputs();

    const dates = Object.keys(dailyMap);
    const countMap = Object.fromEntries(
        dates.map((d) => [d, dailyMap[d].length])
    );

    // Fetch all posts and sort by date descending
    const allPosts = getAllMarkdownMeta()
        .filter((post) => post.date)
        .sort((a, b) => {
            return new Date(b.date!).getTime() - new Date(a.date!).getTime();
        });

    return (
        <main style={{ padding: "2rem" }}>
            <h1 className="text-2xl font-bold mb-4">Daily Output</h1>

            <DailyCalendar
                dailyDates={dates}
                dailyCountMap={countMap}
            />

            <div className="mt-8">
                <h2 className="text-xl font-bold mb-4 border-b pb-2">All Posts (Newest First)</h2>
                <ul className="space-y-3">
                    {allPosts.map((post) => (
                        <li key={post.slug.join("/")} className="border-b border-gray-100 pb-2 last:border-0">
                            <div className="flex items-center gap-4">
                                <span className="text-gray-500 font-mono text-sm whitespace-nowrap">{post.date}</span>
                                <Link
                                    href={`/knowledge/${post.slug.join("/")}`}
                                    className="text-blue-600 hover:text-blue-800 hover:underline block truncate"
                                >
                                    {post.title}
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}
