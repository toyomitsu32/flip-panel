import { useState } from "react";

const topics = [
  {
    id: 1,
    label: "プロダクト紹介",
    theme: "blue",
    emoji: "🛠️",
    title: "作ってきた3つのプロダクト",
    desc: "スキルマーケット / ノウハウ図書館 / トークブリッジ。それぞれどんな課題を解決するのか？",
  },
  {
    id: 2,
    label: "開発思想",
    theme: "purple",
    emoji: "💡",
    title: "「時短ツール」ではなく\n「人の背中を押すもの」を作る",
    desc: "体験を変える（DX）とはどういうことか？単なる効率化との違いを語ります。",
  },
  {
    id: 3,
    label: "MVVの話",
    theme: "green",
    emoji: "🎯",
    title: "MVVを掲げると\n「機能追加の判断基準」が生まれる",
    desc: "個人開発でもMVVを設定する理由。「あれば便利」な機能を切り捨てる勇気。",
  },
  {
    id: 4,
    label: "フィードバック",
    theme: "red",
    emoji: "🗣️",
    title: "泥臭いフィードバックが\n品質を作る",
    desc: "完成を待たず1人に使ってもらう。自分の足を使って生の声を集める大切さ。",
  },
  {
    id: 5,
    label: "インフラ構成",
    theme: "orange",
    emoji: "⚙️",
    title: "構成はシンプル：\nClaude Code × Google AI Studio",
    desc: "バックエンドなし・サーバーなし。フロントエンドのみで動く理由とローカルストレージ活用術。",
  },
  {
    id: 6,
    label: "開発フロー",
    theme: "teal",
    emoji: "🔄",
    title: "手間はかかるが、\nクオリティ優先の開発フロー",
    desc: "Claude Codeで書いてGoogle AI Studioに手動反映。泥臭いけど最適解な理由とは？",
  },
  {
    id: 7,
    label: "今後の展望",
    theme: "pink",
    emoji: "🚀",
    title: "Google Cloud連携で\nマルチモーダルへ拡張できる",
    desc: "画像生成・音声認識も視野に。無料枠から始めて柔軟にスケールする未来の構想。",
  },
];

const themeStyles: Record<string, { back: string; border: string; label: string }> = {
  blue:   { back: "from-blue-700 to-sky-500",    border: "border-sky-500/40",    label: "text-sky-300" },
  purple: { back: "from-violet-700 to-purple-500", border: "border-purple-400/40", label: "text-purple-300" },
  green:  { back: "from-emerald-800 to-emerald-500", border: "border-emerald-400/40", label: "text-emerald-300" },
  red:    { back: "from-red-800 to-red-500",      border: "border-red-400/40",    label: "text-red-300" },
  orange: { back: "from-amber-800 to-amber-500",  border: "border-amber-400/40",  label: "text-amber-300" },
  teal:   { back: "from-teal-800 to-teal-500",    border: "border-teal-400/40",   label: "text-teal-300" },
  pink:   { back: "from-pink-800 to-pink-500",    border: "border-pink-400/40",   label: "text-pink-300" },
};

function FlipCard({ topic, flipped, onClick }: { topic: typeof topics[0]; flipped: boolean; onClick: () => void }) {
  const t = themeStyles[topic.theme];
  return (
    <div
      className="cursor-pointer"
      style={{ perspective: "1200px" }}
      onClick={onClick}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "220px",
          transformStyle: "preserve-3d",
          transition: "transform 0.65s cubic-bezier(0.4,0.2,0.2,1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          borderRadius: "1.125rem",
        }}
      >
        {/* FRONT */}
        <div
          className={`absolute inset-0 rounded-[1.125rem] flex flex-col items-center justify-center p-6 text-center border ${t.border} bg-gradient-to-br from-slate-900 to-slate-950`}
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          <span className="text-xs tracking-[3px] uppercase text-slate-500 mb-3">
            Topic {String(topic.id).padStart(2, "0")}
          </span>
          <span className="text-6xl font-black text-white/10 leading-none mb-3 select-none">?</span>
          <span className={`text-sm font-bold tracking-wide ${t.label}`}>{topic.label}</span>
          <span className="absolute bottom-3 right-4 text-[11px] text-slate-600">タップして開封</span>
        </div>

        {/* BACK */}
        <div
          className={`absolute inset-0 rounded-[1.125rem] flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br ${t.back} text-white`}
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="text-3xl mb-2">{topic.emoji}</div>
          <div className="text-[11px] tracking-[3px] uppercase opacity-70 mb-2">
            Topic {String(topic.id).padStart(2, "0")}
          </div>
          <div className="text-base font-black leading-snug mb-3 whitespace-pre-line">
            {topic.title}
          </div>
          <div className="text-xs leading-relaxed opacity-85">{topic.desc}</div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());

  const toggle = (id: number) => {
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const reset = () => setFlipped(new Set());

  const opened = flipped.size;
  const total = topics.length;
  const pct = (opened / total) * 100;

  return (
    <div className="min-h-screen bg-[#0d0d1a] text-white flex flex-col items-center px-5 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-xs tracking-[4px] uppercase text-sky-400 mb-3">
          リベシティ × スキルマーケットオフ会
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-4"
          style={{
            background: "linear-gradient(135deg, #fff 0%, #7dd3fc 55%, #a78bfa 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          LLMを使ったWebアプリ開発の裏側<br />全部見せます
        </h1>
        <p className="text-slate-400 text-sm">
          対談トピックパネル ― クリックしてテーマを開封しよう！
        </p>
      </div>

      {/* Hint */}
      <p className="text-slate-600 text-xs mb-8 flex items-center gap-1">
        <span>👆</span> パネルをクリックするとテーマが現れます
      </p>

      {/* Progress */}
      <div className="w-full max-w-5xl mb-8">
        <div className="flex justify-between text-xs text-slate-500 mb-2">
          <span>開封済みトピック</span>
          <span>{opened} / {total}</span>
        </div>
        <div className="h-1 rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${pct}%`,
              background: "linear-gradient(90deg, #7dd3fc, #a78bfa)",
            }}
          />
        </div>
      </div>

      {/* Grid */}
      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {topics.map((topic) => (
          <FlipCard
            key={topic.id}
            topic={topic}
            flipped={flipped.has(topic.id)}
            onClick={() => toggle(topic.id)}
          />
        ))}
      </div>

      {/* Reset */}
      <button
        onClick={reset}
        className="mt-12 px-9 py-3 rounded-full border border-sky-400/30 text-sky-400 text-sm font-bold tracking-widest hover:bg-sky-400/10 transition-colors"
      >
        ↺ パネルをリセット
      </button>
    </div>
  );
}
