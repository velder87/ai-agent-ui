const SUGGESTS = [
'Top 5 produits sur 8 semaines',
'Prévois les ventes 6 semaines',
'sql: SELECT TOP 5 * FROM dbo.vw_WeeklySalesByProduct',
'Quelle tendance pour le produit le plus vendu ?'
]
export default function SuggestChips({ onPick }) {
return (
<div className="flex flex-wrap gap-2 mt-4">
{SUGGESTS.map((s, i) => (
<button key={i} onClick={() => onPick(s)} className="px-3 py-2 rounded-full bg-card text-sub hover:text-ink hover:bg-card/80 transition">{s}</button>
))}
</div>
)
}