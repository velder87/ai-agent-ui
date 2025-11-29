import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'


export default function MessageBubble({ role = 'user', content }) {
const isUser = role === 'user'
return (
<div className={`w-full flex ${isUser ? 'justify-end' : 'justify-start'}`}>
<div className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-soft ${isUser ? 'bg-accent/20 text-ink' : 'bg-card text-ink'}`}>
{isUser ? (
<div className="whitespace-pre-wrap">{content}</div>
) : (
<div className="markdown prose-invert">
<ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
{content || ''}
</ReactMarkdown>
</div>
)}
</div>
</div>
)
}