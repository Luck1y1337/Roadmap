import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocalStorage } from '../hooks'
import type { Todo, TodoFilter } from '../types'

export default function TodoSection() {
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

  const filtered = todos.filter(t => {
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })

  const activeCount = todos.filter(t => !t.completed).length
  const filters: { id: TodoFilter; label: string }[] = [
    { id: 'all', label: 'Hammasi' },
    { id: 'active', label: 'Bajarilmagan' },
    { id: 'completed', label: 'Bajarilgan' },
  ]

  return (
    <section id="todos" className="section">
      <div className="section-header">
        <span className="section-tag">TODO</span>
        <h2 className="section-title">✅ Shaxsiy Vazifalar</h2>
        <p className="section-desc">O'z vazifalaringizni qo'shing va kuzatib boring</p>
      </div>

      <div className="todo-container">
        <div className="todo-input-wrap">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addTodo()}
            placeholder="Yangi vazifa yozing..."
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
            {filtered.map(t => (
              <motion.li
                key={t.id}
                className={`todo-item ${t.completed ? 'completed' : ''}`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                layout
              >
                <button className="todo-check" onClick={() => toggleTodo(t.id)} aria-label="Toggle" />
                <span className="todo-text">{t.text}</span>
                <button className="todo-delete" onClick={() => deleteTodo(t.id)} aria-label="Delete">✕</button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        <div className="todo-summary">
          <span>{activeCount} ta bajarilmagan vazifa</span>
          <button className="btn-clear" onClick={clearCompleted}>Bajarilganlarni o'chirish</button>
        </div>
      </div>
    </section>
  )
}
