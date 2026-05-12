import { useState, useEffect } from 'react'

const STORAGE_KEY = 'tesla-app-data'

export interface ScoreHistoryEntry {
  date: string
  score: number
  factors: {
    name: string
    value: number
  }[]
}

export interface ChargingSession {
  id: string
  date: string
  station: string
  kwh: number
  cost: number
  duration: number // minutes
}

export interface AppData {
  currentScore: number
  scoreHistory: ScoreHistoryEntry[]
  chargingSessions: ChargingSession[]
  lastUpdated: string
}

const defaultData: AppData = {
  currentScore: 87,
  scoreHistory: [],
  chargingSessions: [],
  lastUpdated: new Date().toISOString()
}

export function useTeslaData() {
  const [data, setData] = useState<AppData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        return JSON.parse(saved)
      }
    } catch (e) {
      console.error('Failed to load data', e)
    }
    return defaultData
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  const updateScore = (newScore: number, factors: { name: string; value: number }[]) => {
    const entry: ScoreHistoryEntry = {
      date: new Date().toISOString(),
      score: newScore,
      factors
    }

    setData(prev => ({
      ...prev,
      currentScore: newScore,
      scoreHistory: [...prev.scoreHistory.slice(-29), entry], // Keep last 30 entries
      lastUpdated: new Date().toISOString()
    }))
  }

  const addChargingSession = (session: Omit<ChargingSession, 'id' | 'date'>) => {
    const newSession: ChargingSession = {
      ...session,
      id: crypto.randomUUID(),
      date: new Date().toISOString()
    }

    setData(prev => ({
      ...prev,
      chargingSessions: [...prev.chargingSessions, newSession],
      lastUpdated: new Date().toISOString()
    }))
  }

  const clearHistory = () => {
    setData(defaultData)
  }

  return {
    data,
    updateScore,
    addChargingSession,
    clearHistory
  }
}