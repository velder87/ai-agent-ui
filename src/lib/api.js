import axios from 'axios'
const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE?.replace(/\/$/, ''), timeout: 60000 })
export async function postAgent(message) { const res = await api.post('/agent', { message }); return res.data }
export async function health() { const res = await api.get('/health'); return res.data }