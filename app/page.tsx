import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: "2rem", lineHeight: 1.7 }}>
      <h1>元鉄鋼マンエンジニア 備忘録</h1>

      <p>
        このサイトは、日々の学びと思考をアウトプットし続けるための場所です。
      </p>

      <h2>Why this site?</h2>
      <p>
        技術を「知っている」だけでは不十分だと痛感しました。
        なぜその設計にしたのか、どんな選択肢があり、何を捨てたのか。
        それらを言語化できて初めて、価値になると考えています。
      </p>

      <h2>My rule</h2>
      <ul>
        <li>完璧を求めない。60点で公開する</li>
        <li>結論 → 理由 → 具体例の順で書く</li>
        <li>学んだことだけでなく、考えたことを書く</li>
        <li>言葉で伝えることを想定し、文章のみでまとめる</li>
      </ul>

      <ul>
        <li><Link href="/knowledge">Knowledge</Link></li>
      </ul>
    </main>
  );
}
