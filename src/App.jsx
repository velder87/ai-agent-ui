import { useEffect, useRef, useState } from 'react'
import './styles.css'
import BrandHeader from './components/BrandHeader'
import SuggestChips from './components/SuggestChips'
import MessageBubble from './components/MessageBubble'
import ChatInput from './components/ChatInput'
import { postAgent, health } from './lib/api'
import { streamAgent } from './lib/sse'


export default function App() {
const [msgs, setMsgs] = useState([{ role: 'assistant', content: 'Bonjour 👋Je suis votre **AI Agent**. Posez une question métier ou essayez un exemple ci‑dessous.' }])
const [loading, setLoading] = useState(false)
const [sys, setSys] = useState(null)
const listRef = useRef(null)
const abortRef = useRef(null)


useEffect(() => { health().then(setSys).catch(() => setSys(null)) }, [])
useEffect(() => { listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' }) }, [msgs, loading])


const send = async (message) => {
setMsgs(m => [...m, { role: 'user', content: message }, { role: 'assistant', content: '' }])
setLoading(true)


// If user forces SQL, do non-streaming (fast table) via /agent
if (message.trim().toLowerCase().startsWith('sql:')) {
try {
const res = await postAgent(message)
const md = res?.answer_markdown || '*(Pas de réponse)*'
setMsgs(m => m.map((mm, i, arr) => i === arr.length - 1 ? { ...mm, content: md } : mm))
} catch (e) {
setMsgs(m => m.map((mm, i, arr) => i === arr.length - 1 ? { ...mm, content: `❌ **Erreur**: ${e?.message || e}` } : mm))
} finally { setLoading(false) }
return
}


// Streaming via SSE
const ctrl = new AbortController()
abortRef.current = ctrl


try {
await streamAgent(message, (delta) => {
setMsgs(m => m.map((mm, i, arr) => i === arr.length - 1 ? { ...mm, content: (mm.content || '') + delta } : mm))
}, ctrl.signal)
} catch (e) {
setMsgs(m => m.map((mm, i, arr) => i === arr.length - 1 ? { ...mm, content: `❌ **Erreur stream**: ${e?.message || e}` } : mm))
} finally {
setLoading(false)
abortRef.current = null
}
}


return (
<div className="min-h-dvh max-w-gem mx-auto px-4">
<BrandHeader />
<main className="mt-6">
<div className="flex gap-2 text-xs text-sub">
<span className="px-2 py-1 rounded-full bg-card">API: {import.meta.env.VITE_API_BASE || 'n/a'}</span>
{sys && (<span className="px-2 py-1 rounded-full bg-card">DB: {sys.db_configured ? '✅' : '—'} | DBX: {sys.dbx_configured ? '✅' : '—'} | LLM: {sys.llm}</span>)}
</div>
<div ref={listRef} className="mt-4 h-[60dvh] overflow-y-auto flex flex-col gap-3 p-2 bg-[#0f141b] rounded-2xl">
{msgs.map((m, i) => (<MessageBubble key={i} role={m.role} content={m.content} />))}
{loading && <div className="text-sub text-sm">L’agent réfléchit…</div>}
</div>
<SuggestChips onPick={send} />
<div className="mt-4"><ChatInput onSend={send} disabled={loading} /></div>
</main>
</div>
)
}