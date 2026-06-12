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

import AuthModal from './components/AuthModal'

import { useAuth } from './AuthContext'
import { api } from './api'

function AppContent() {
  const { user } = useAuth()
  const [currentTrack, setCurrentTrack] = useState<Track>('both')
  const [overallProgress, setOverallProgress] = useState(0)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const activeSection = useScrollSpy(sectionIds)

  useEffect(() => {
    const handleOpenAuth = () => setIsAuthOpen(true)
    window.addEventListener('open-auth', handleOpenAuth)
    return () => window.removeEventListener('open-auth', handleOpenAuth)
  }, [])

  useEffect(() => {
    if (user) {
      api.get('/progress').then(res => {
        const checks = res || {}
        const totalTasks = 36 // total task count across all phases
        const checked = Object.values(checks).filter(Boolean).length
        setOverallProgress(Math.round((checked / totalTasks) * 100))
      }).catch(err => console.error(err))
    } else {
      setOverallProgress(0)
    }
  }, [user])

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
        <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      </main>
    </>
  )
}

import { AuthProvider } from './AuthContext'

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  )
}
