export default function BrandHeader() {
return (
<header className="w-full flex items-center justify-between py-4">
<div className="flex items-center gap-3">
<div className="w-9 h-9 rounded-xl bg-accent/20 flex items-center justify-center"><span className="text-accent text-lg">⚡</span></div>
<div>
<div className="text-ink font-semibold">Let’s Tech – AI Agent</div>
<div className="text-sub text-xs">Azure SQL • Databricks • FastAPI • Streaming</div>
</div>
</div>
<div className="text-sub text-xs">Gemini‑style UI</div>
</header>
)
}