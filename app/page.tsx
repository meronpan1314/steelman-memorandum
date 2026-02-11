import Link from "next/link";
import { getAllMarkdownMeta } from "@/lib/markdown";

export default function Home() {
  const allPosts = getAllMarkdownMeta()
    .filter((post) => post.date)
    .sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime())
    .slice(0, 5);

  return (
    <main className="max-w-4xl mx-auto py-12 px-6">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-4 tracking-tight">
          <span className="text-emerald-600 dark:text-emerald-500">元鉄鋼マンエンジニア</span>の備忘録
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
          このサイトは、日々の学びと思考をアウトプットし続けるための場所です。<br />
          技術、キャリア、そして日々の気づきを記録しています。
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/knowledge"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md"
          >
            Start Reading
          </Link>
          <Link
            href="/daily"
            className="bg-white dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400 border-2 border-emerald-600 dark:border-emerald-500 font-bold py-3 px-6 rounded-lg hover:bg-emerald-50 dark:hover:bg-zinc-700 transition-colors"
          >
            View Daily Log
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <section>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 border-b-2 border-emerald-500 pb-2 inline-block">
            Recent Updates
          </h2>
          <ul className="space-y-4">
            {allPosts.map((post) => (
              <li key={post.slug.join("/")} className="group">
                <Link href={`/knowledge/${post.slug.join("/")}`} className="block p-4 rounded-lg bg-gray-50 dark:bg-zinc-900 hover:bg-emerald-50 dark:hover:bg-zinc-800 transition-colors border border-gray-100 dark:border-zinc-800 hover:border-emerald-200 dark:hover:border-emerald-800 shadow-sm hover:shadow-md">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-xs bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 rounded uppercase tracking-wide">
                      New
                    </span>
                    <span className="text-gray-400 text-xs font-mono">{post.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 border-b-2 border-emerald-500 pb-2 inline-block">
              Why this site?
            </h2>
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border-l-4 border-emerald-500 shadow-sm">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                技術を「知っている」だけでは不十分だと痛感しました。
                なぜその設計にしたのか、どんな選択肢があり、何を捨てたのか。
                それらを言語化できて初めて、価値になると考えています。
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 border-b-2 border-emerald-500 pb-2 inline-block">
              My Rule
            </h2>
            <ul className="space-y-2 bg-gray-50 dark:bg-zinc-800/50 p-6 rounded-xl">
              {["完璧を求めない。60点で公開する", "結論 → 理由 → 具体例の順で書く", "学んだことだけでなく、考えたことを書く", "言葉で伝えることを想定し、文章のみでまとめる"].map((rule, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                  <span className="text-emerald-500 mt-1">✔</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
