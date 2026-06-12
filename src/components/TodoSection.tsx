import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocalStorage } from '../hooks'
import { useLanguage } from '../LanguageContext'
import type { Todo, TodoFilter } from '../types'

export default function TodoSection() {
  const { t } = useLanguage()
  const [todos, setTodos] = useLocalStorage<Todo[]>('luck1y_todos', [])
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState<TodoFilter>('all')

  const addTodo = () => {
    const text = input.trim()
    if (!text) return
    setTodos(prev => [...prev, { id: Date.now(), text, completed: false }])
    setInput('')
  }

  const toggleTodo = (id: number) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const deleteTodo = (id: number) => {
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
    <section id="todos" className="section">
      <div className="section-header">
        <span className="section-tag">{t.todos.tag}</span>
        <h2 className="section-title">{t.todos.title}</h2>
        <p className="section-desc">{t.todos.desc}</p>
      </div>

      <div className="todo-container">
        <div className="todo-input-wrap">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addTodo()}
            placeholder={t.todos.placeholder}
            autoComplete="off"
          />
          <button className="btn-add-todo" onClick={addTodo}>+</button>
        </div>

        <div className="todo-filters">
          {filters.map(f => (
            <button
              key={f.id}
              className={`todo-filter ${filter === f.id ? 'active' : ''}`}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <ul className="todo-list">
          <AnimatePresence>
            {filtered.map(td => (
              <motion.li
                key={td.id}
                className={`todo-item ${td.completed ? 'completed' : ''}`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                layout
              >
                <button className="todo-check" onClick={() => toggleTodo(td.id)} aria-label="Toggle" />
                <span className="todo-text">{td.text}</span>
                <button className="todo-delete" onClick={() => deleteTodo(td.id)} aria-label="Delete">✕</button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        <div className="todo-summary">
          <span>{t.todos.count(activeCount)}</span>
          <button className="btn-clear" onClick={clearCompleted}>{t.todos.clear}</button>
        </div>
      </div>
    </section>
  )
}
