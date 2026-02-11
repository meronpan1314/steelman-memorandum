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
        <main className="max-w-4xl mx-auto py-12 px-6">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-8 border-l-4 border-emerald-500 pl-4">
                Daily Output
            </h1>

            <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-gray-100 dark:border-zinc-800 shadow-sm mb-12">
                <DailyCalendar
                    dailyDates={dates}
                    dailyCountMap={countMap}
                />
            </div>

            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 border-b-2 border-emerald-500 pb-2 inline-block">
                    All Posts <span className="text-sm font-normal text-gray-500 ml-2">(Newest First)</span>
                </h2>
                <ul className="grid gap-4">
                    {allPosts.map((post) => (
                        <li key={post.slug.join("/")} className="group">
                            <Link
                                href={`/knowledge/${post.slug.join("/")}`}
                                className="block p-4 rounded-lg bg-gray-50 dark:bg-zinc-900 hover:bg-emerald-50 dark:hover:bg-zinc-800 transition-colors border border-gray-100 dark:border-zinc-800 hover:border-emerald-200 dark:hover:border-emerald-800 shadow-sm hover:shadow-md"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-xs bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 rounded uppercase tracking-wide">
                                        Post
                                    </span>
                                    <span className="text-gray-400 text-xs font-mono">{post.date}</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                                    {post.title}
                                </h3>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}
