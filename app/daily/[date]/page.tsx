import Link from "next/link";
import { getDailyOutputs } from "@/lib/daily";
import { notFound } from "next/navigation";

type Props = {
    params: Promise<{
        date: string;
    }>;
};

export default async function DailyDetailPage(props: Props) {
    const params = await props.params;
    const dailyMap = getDailyOutputs();
    const outputs = dailyMap[params.date];

    if (!outputs) notFound();

    return (
        <main className="max-w-4xl mx-auto py-12 px-6">
            <div className="mb-8">
                <Link
                    href="/daily"
                    className="text-sm text-gray-500 hover:text-emerald-600 mb-4 inline-block font-medium transition-colors"
                >
                    ← Back to Daily Log
                </Link>
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 border-l-4 border-emerald-500 pl-4">
                    {params.date}
                </h1>
            </div>

            <ul className="grid gap-4">
                {outputs.map((output) => (
                    <li key={output.slug.join("/")} className="group">
                        <Link
                            href={`/knowledge/${output.slug.join("/")}`}
                            className="block p-4 rounded-lg bg-gray-50 dark:bg-zinc-900 hover:bg-emerald-50 dark:hover:bg-zinc-800 transition-colors border border-gray-100 dark:border-zinc-800 hover:border-emerald-200 dark:hover:border-emerald-800 shadow-sm hover:shadow-md"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-xs bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 rounded uppercase tracking-wide">
                                    Post
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                                {output.title}
                            </h3>
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    );
}
