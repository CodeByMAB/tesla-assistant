import { useState, useEffect } from 'react'
import { History, TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface ScoreEntry {
  date: string
  score: number
}

function ScoreHistory() {
  const [history, setHistory] = useState<ScoreEntry[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('tesla-score-history')
    if (saved) {
      setHistory(JSON.parse(saved))
    }
  }, [])

  const saveScore = () => {
    const savedScore = localStorage.getItem('tesla-safety-score')
    if (savedScore) {
      const data = JSON.parse(savedScore)
      const entry: ScoreEntry = {
        date: new Date().toISOString(),
        score: data.overallScore
      }
      const newHistory = [...history.slice(-29), entry]
      setHistory(newHistory)
      localStorage.setItem('tesla-score-history', JSON.stringify(newHistory))
    }
  }

  const clearHistory = () => {
    setHistory([])
    localStorage.removeItem('tesla-score-history')
  }

  const latestScore = history.length > 0 ? history[history.length - 1].score : 0
  const previousScore = history.length > 1 ? history[history.length - 2].score : latestScore
  const trend = latestScore > previousScore ? 'up' : latestScore < previousScore ? 'down' : 'flat'

  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp size={16} />
    if (trend === 'down') return <TrendingDown size={16} />
    return <Minus size={16} />
  }

  const getTrendColor = () => {
    if (trend === 'up') return 'var(--tesla-green)'
    if (trend === 'down') return 'var(--tesla-red)'
    return 'var(--tesla-gray)'
  }

  const maxScore = Math.max(...history.map(h => h.score), 100)
  const minScore = Math.min(...history.map(h => h.score), 0)

  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
        <History size={18} style={{ color: 'var(--tesla-blue)' }} />
        <span style={{ fontWeight: '600', fontSize: '15px' }}>Score History</span>
      </div>

      {history.length > 0 ? (
        <>
          {/* Mini Chart */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'flex-end', 
            gap: '3px', 
            height: '60px', 
            marginBottom: '16px',
            padding: '8px',
            background: 'var(--tesla-dark)',
            borderRadius: 'var(--radius-sm)'
          }}>
            {history.map((entry, i) => {
              const height = ((entry.score - minScore) / (maxScore - minScore)) * 100
              return (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: `${Math.max(height, 5)}%`,
                    background: entry.score >= 90 ? 'var(--tesla-green)' : 
                               entry.score >= 70 ? 'var(--tesla-yellow)' : 'var(--tesla-red)',
                    borderRadius: '2px',
                    transition: 'height 0.3s ease'
                  }}
                  title={`${entry.score} - ${new Date(entry.date).toLocaleDateString()}`}
                />
              )
            })}
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--tesla-gray)', textTransform: 'uppercase' }}>Current</div>
              <div style={{ fontSize: '24px', fontWeight: '700' }}>{latestScore}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '11px', color: 'var(--tesla-gray)', textTransform: 'uppercase' }}>Trend</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '24px', fontWeight: '700', color: getTrendColor() }}>
                {getTrendIcon()}
              </div>
            </div>
          </div>

          {/* Range */}
          <div style={{ fontSize: '12px', color: 'var(--tesla-gray)', marginBottom: '12px' }}>
            30-day range: {minScore} - {maxScore}
          </div>
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '20px', color: 'var(--tesla-gray)' }}>
          No history yet. Save your score to start tracking!
        </div>
      )}

      <div style={{ display: 'flex', gap: '8px' }}>
        <button className="btn btn-primary" onClick={saveScore} style={{ flex: 1 }}>
          Save Current Score
        </button>
        {history.length > 0 && (
          <button className="btn btn-secondary" onClick={clearHistory}>
            Clear
          </button>
        )}
      </div>
    </div>
  )
}

export default ScoreHistory