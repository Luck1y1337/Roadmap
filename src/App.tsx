import { useState, useEffect, useMemo } from 'react'
import { LanguageProvider } from './LanguageContext'
import ParticleCanvas from './components/ParticleCanvas'
import Sidebar from './components/Sidebar'
import Hero from './components/Hero'
import SkillsSection from './components/SkillsSection'
import RoadmapSection from './components/RoadmapSection'
import ResourcesSection from './components/ResourcesSection'
import PracticeSection from './components/PracticeSection'
import AbroadSection from './components/AbroadSection'
import TodoSection from './components/TodoSection'
import Footer from './components/Footer'
import { useScrollSpy } from './hooks'
import type { Track } from './types'

const sectionIds = ['hero', 'skills', 'roadmap', 'resources', 'practice', 'abroad', 'todos']

import TerminalWidget from './components/TerminalWidget'
import FocusWidget from './components/FocusWidget'

function AppContent() {
  const [currentTrack, setCurrentTrack] = useState<Track>('both')
  const [overallProgress, setOverallProgress] = useState(0)
  const activeSection = useScrollSpy(sectionIds)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('luck1y_checks')
      if (saved) {
        const checks = JSON.parse(saved) as Record<string, boolean>
        const totalTasks = 36 // total task count across all phases
        const checked = Object.values(checks).filter(Boolean).length
        setOverallProgress(Math.round((checked / totalTasks) * 100))
      }
    } catch { /* ignore */ }
  }, [])

  const memoizedActiveSection = useMemo(() => activeSection, [activeSection])

  return (
    <>
      <ParticleCanvas />
      <Sidebar activeSection={memoizedActiveSection} overallProgress={overallProgress} />
      <main className="flex-1 ml-0 md:ml-[var(--spacing-sidebar)] pt-14 md:pt-0 w-full md:w-[calc(100%-var(--spacing-sidebar))] min-h-screen relative z-10 transition-all duration-300">
        <Hero currentTrack={currentTrack} onTrackChange={setCurrentTrack} />
        <SkillsSection />
        <RoadmapSection currentTrack={currentTrack} onProgressChange={setOverallProgress} />
        <ResourcesSection />
        <PracticeSection />
        <AbroadSection />
        <TodoSection />
        <Footer />
        <TerminalWidget />
        <FocusWidget />
      </main>
    </>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}
