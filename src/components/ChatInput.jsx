import { useState } from 'react'
export default function ChatInput({ onSend, disabled }) {
const [text, setText] = useState('')
const handleSend = () => { const msg = text.trim(); if (!msg) return; onSend(msg); setText('') }
return (
<div className="w-full bg-card rounded-2xl p-2 flex items-end gap-2 shadow-soft">
<textarea
placeholder="Demandez n’importe quoi…"
value={text}
onChange={e => setText(e.target.value)}
onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }}
rows={1}
className="flex-1 bg-transparent outline-none resize-none text-ink placeholder:text-sub px-3 py-2"
/>
<button onClick={handleSend} disabled={disabled || !text.trim()} className="px-4 py-2 rounded-xl bg-accent text-white disabled:opacity-50" aria-label="Envoyer">Envoyer</button>
</div>
)
}