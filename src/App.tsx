import { useState, useEffect, useMemo } from 'react'
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
import { sectionIds, phases } from './data'
import type { Track } from './types'

export default function App() {
  const [currentTrack, setCurrentTrack] = useState<Track>('both')
  const [overallProgress, setOverallProgress] = useState(0)
  const activeSection = useScrollSpy(sectionIds)

  // Calculate initial progress from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('luck1y_checks')
      if (saved) {
        const checks = JSON.parse(saved) as Record<string, boolean>
        const allTasks = phases.flatMap(p => p.tasks)
        const checked = allTasks.filter(t => checks[t.id]).length
        setOverallProgress(Math.round((checked / allTasks.length) * 100))
      }
    } catch { /* ignore */ }
  }, [])

  // Memoize to prevent unnecessary re-renders
  const memoizedActiveSection = useMemo(() => activeSection, [activeSection])

  return (
    <>
      <ParticleCanvas />
      <Sidebar activeSection={memoizedActiveSection} overallProgress={overallProgress} />
      <main className="main-content">
        <Hero currentTrack={currentTrack} onTrackChange={setCurrentTrack} />
        <SkillsSection />
        <RoadmapSection currentTrack={currentTrack} onProgressChange={setOverallProgress} />
        <ResourcesSection />
        <PracticeSection />
        <AbroadSection />
        <TodoSection />
        <Footer />
      </main>
    </>
  )
}
