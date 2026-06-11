export interface Phase {
  id: string
  badge: string
  badgeClass: string
  title: string
  period: string
  track: 'both' | 'cyber' | 'dev'
  tasks: PhaseTask[]
  tip: { icon: string; text: string; warning?: boolean }
}

export interface PhaseTask {
  id: string
  text: string
}

export interface Resource {
  icon: string
  name: string
  type: string
  desc: string
  url: string
}

export interface PracticeItem {
  difficulty: 'easy' | 'medium' | 'hard'
  category: string
  title: string
  desc: string
  tags: string[]
  url: string
  linkText: string
}

export interface Todo {
  id: number
  text: string
  completed: boolean
}

export type Track = 'both' | 'cyber' | 'dev'
export type ResourceCategory = 'frontend' | 'backend' | 'security' | 'dsa' | 'ielts'
export type TodoFilter = 'all' | 'active' | 'completed'
