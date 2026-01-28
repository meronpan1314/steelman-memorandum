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
        <main style={{ padding: "2rem" }}>
            <h1>{params.date}</h1>

            <ul>
                {outputs.map((output) => (
                    <li key={output.slug.join("/")}>
                        <Link href={`/knowledge/${output.slug.join("/")}`}>
                            {output.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    );
}
