import { createParser } from 'eventsource-parser'


export async function streamAgent(message, onDelta, signal) {
// Calls /agent/stream (text/event-stream). onDelta receives partial markdown strings.
const base = (import.meta.env.VITE_API_BASE || '').replace(/\/$/,'')
const res = await fetch(base + '/agent/stream', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ message }),
signal,
})
if (!res.ok || !res.body) throw new Error('Stream failed: ' + res.status)


const reader = res.body.getReader()
const decoder = new TextDecoder()
const parser = createParser((event) => {
if (event.type === 'event') {
if (event.data === '[DONE]') return
try { const j = JSON.parse(event.data); if (j.delta) onDelta(j.delta) } catch {}
}
})


while (true) {
const { value, done } = await reader.read()
if (done) break
parser.feed(decoder.decode(value))
}
}