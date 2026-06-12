import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../LanguageContext'
import { useLocalStorage, trackActivity } from '../hooks'
import Heatmap from './Heatmap'
import type { Todo, TodoFilter } from '../types'

export default function TodoSection() {
  const { t } = useLanguage()
  const [todos, setTodos] = useLocalStorage<Todo[]>('luck1y_todos', [])
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState<TodoFilter>('all')

  const addTodo = () => {
    const text = input.trim()
    if (!text) return
    setTodos(prev => [{ id: Date.now(), text, completed: false }, ...prev])
    setInput('')
    trackActivity()
  }

  const toggleTodo = (id: number | string) => {
    setTodos(prev => prev.map(t => {
      if (t.id === id) {
        if (!t.completed) trackActivity()
        return { ...t, completed: !t.completed }
      }
      return t
    }))
  }

  const deleteTodo = (id: number | string) => {
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  const clearCompleted = () => {
    setTodos(prev => prev.filter(t => !t.completed))
  }

  const filtered = todos.filter(td => {
    if (filter === 'active') return !td.completed
    if (filter === 'completed') return td.completed
    return true
  })

  const activeCount = todos.filter(td => !td.completed).length
  const filters: { id: TodoFilter; label: string }[] = [
    { id: 'all', label: t.todos.all },
    { id: 'active', label: t.todos.active },
    { id: 'completed', label: t.todos.completed },
  ]

  return (
    <section id="todos" className="py-20 px-5 md:px-12 max-w-[900px] mx-auto min-h-[80vh]">
      <div className="mb-12 text-center">
        <span className="inline-block font-mono text-[0.7rem] tracking-[0.2em] text-accent-cyan px-3 py-1 border border-accent-cyan/20 rounded-full mb-3.5">{t.todos.tag}</span>
        <h2 className="text-[2rem] font-extrabold mb-2 tracking-tight">{t.todos.title}</h2>
        <p className="text-text-secondary text-base max-w-[600px] mx-auto">{t.todos.desc}</p>
      </div>

      <Heatmap />

      <div className="bg-card border border-border rounded-xl p-5 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex gap-2.5 mb-6 relative">
          <input
            type="text"
            className="flex-1 bg-card border border-border rounded-lg py-3.5 px-4 text-[0.95rem] text-text-primary outline-none transition-all duration-200 focus:border-accent-cyan focus:shadow-[0_0_15px_rgba(0,212,255,0.15)] placeholder:text-text-muted"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addTodo()}
            placeholder={t.todos.placeholder}
            autoComplete="off"
          />
          <button className="w-12 h-[52px] bg-accent-cyan text-[#06080f] border-none rounded-lg text-2xl cursor-pointer transition-all duration-200 shrink-0 flex items-center justify-center hover:bg-[#33dfff] hover:scale-105 active:scale-95" onClick={addTodo}>+</button>
        </div>

        <div className="flex gap-2 mb-6 border-b border-border pb-4">
          {filters.map(f => (
            <button
              key={f.id}
              className={`bg-transparent border-none text-[0.85rem] py-1.5 px-3 rounded-full cursor-pointer transition-all duration-200 hover:text-text-primary hover:bg-white/5 ${filter === f.id ? 'bg-white/10 text-text-primary font-semibold' : 'text-text-secondary'}`}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <ul className="list-none p-0 m-0 flex flex-col gap-2.5 mb-8">
          <AnimatePresence>
            {filtered.map(td => {
              const id = td.id;
              return (
              <motion.li
                key={id}
                className={`flex items-center gap-3.5 border p-3.5 px-4 rounded-lg transition-all duration-300 overflow-hidden hover:border-border-hover ${td.completed ? 'opacity-60 bg-white/5 border-border' : 'bg-card border-border'}`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                layout
              >
                <button className={`w-5 h-5 rounded-md border-2 bg-transparent cursor-pointer shrink-0 transition-all duration-200 relative ${td.completed ? 'border-accent-cyan bg-accent-cyan shadow-[0_0_8px_rgba(0,212,255,0.3)] after:content-["✓"] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:text-[#06080f] after:text-[0.7rem] after:font-bold' : 'border-text-muted'}`} onClick={() => toggleTodo(id)} aria-label="Toggle" />
                <span className={`flex-1 text-[0.95rem] transition-all duration-300 outline-none break-all ${td.completed ? 'line-through text-text-muted' : 'text-text-primary'}`}>{td.text}</span>
                <button className="w-8 h-8 rounded-md bg-transparent border-none text-text-muted cursor-pointer text-base transition-all duration-200 flex items-center justify-center hover:bg-accent-red-light/20 hover:text-accent-red" onClick={() => deleteTodo(id)} aria-label="Delete">✕</button>
              </motion.li>
            )})}
          </AnimatePresence>
        </ul>

        <div className="flex justify-between items-center text-[0.8rem] text-text-muted pt-4 border-t border-border">
          <span>{t.todos.count(activeCount)}</span>
          <button className="bg-transparent border-none text-[0.8rem] text-text-secondary cursor-pointer transition-colors duration-200 hover:text-accent-red hover:underline" onClick={clearCompleted}>{t.todos.clear}</button>
        </div>
      </div>
    </section>
  )
}
