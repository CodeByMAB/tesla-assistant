import { useState, useEffect } from 'react'
import { 
  Shield, 
  Zap, 
  Gauge,
  Footprints,
  Moon, 
  Lightbulb,
  Settings,
  Save,
  X,
  Car,
  Timer,
  History
} from 'lucide-react'
import ScoreHistory from './ScoreHistory'

interface SafetyFactor {
  name: string
  description: string
  currentValue: number
  cap: number
  tip: string
  icon: React.ReactNode
}

interface SafetyScoreData {
  overallScore: number
  factors: SafetyFactor[]
}

const defaultFactors: SafetyFactor[] = [
  {
    name: 'Hard Braking',
    description: 'Excessive force braking without Autopilot',
    currentValue: 2.1,
    cap: 5.2,
    tip: 'Maintain more following distance and brake earlier',
    icon: <Zap size={18} />
  },
  {
    name: 'Aggressive Turning',
    description: 'Lateral acceleration above 0.4g',
    currentValue: 8.5,
    cap: 13.2,
    tip: 'Take turns more slowly, reduce speed before cornering',
    icon: <Gauge size={18} />
  },
  {
    name: 'Excessive Speeding',
    description: '>85mph or >20% faster than traffic',
    currentValue: 12,
    cap: 30,
    tip: 'Stay with traffic flow, use Autopilot to maintain speed',
    icon: <Timer size={18} />
  },
  {
    name: 'Unsafe Following',
    description: 'Following distance under 1.3 seconds',
    currentValue: 3.2,
    cap: 7.2,
    tip: 'Increase gap to 3+ seconds in Autopilot',
    icon: <Footprints size={18} />
  },
  {
    name: 'Late Night Driving',
    description: 'Driving between 10pm-4am',
    currentValue: 5,
    cap: 15,
    tip: 'Avoid late night drives or use FSD for consistency',
    icon: <Moon size={18} />
  }
]

function getScoreClass(score: number): string {
  if (score >= 90) return 'good'
  if (score >= 70) return 'warning'
  return 'danger'
}

function getFactorStatus(value: number, cap: number): string {
  const percentage = (value / cap) * 100
  if (percentage < 50) return 'good'
  if (percentage < 80) return 'warning'
  return 'danger'
}

function SafetyScore() {
  const [showHistory, setShowHistory] = useState(false)
  const [scoreData, setScoreData] = useState<SafetyScoreData>(() => {
    const saved = localStorage.getItem('tesla-safety-score')
    if (saved) {
      return JSON.parse(saved)
    }
    return {
      overallScore: 87,
      factors: defaultFactors
    }
  })
  const [isEditing, setIsEditing] = useState(false)
  const [editScore, setEditScore] = useState(scoreData.overallScore)

  useEffect(() => {
    localStorage.setItem('tesla-safety-score', JSON.stringify(scoreData))
  }, [scoreData])

  const handleSave = () => {
    setScoreData({ ...scoreData, overallScore: parseInt(editScore.toString()) || 0 })
    setIsEditing(false)
  }

  const scoreClass = getScoreClass(scoreData.overallScore)
  const circumference = 2 * Math.PI * 85
  const offset = circumference - (scoreData.overallScore / 100) * circumference

  return (
    <div className="safety-score">
      {/* Main Score Card */}
      <div className="card">
        <div className="score-ring">
          <svg width="200" height="200" viewBox="0 0 200 200">
            <circle className="score-ring-bg" cx="100" cy="100" r="85" />
            <circle 
              className={`score-ring-progress ${scoreClass}`}
              cx="100" cy="100" r="85"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>
          <div className="score-value">
            {isEditing ? (
              <input
                type="number"
                value={editScore}
                onChange={(e) => setEditScore(parseInt(e.target.value) || 0)}
                className="input-field"
                style={{ width: '80px', textAlign: 'center', padding: '8px' }}
                autoFocus
              />
            ) : (
              <div className={`score-number ${scoreClass}`}>
                {scoreData.overallScore}
              </div>
            )}
            <div className="score-label">Safety Score</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          {isEditing ? (
            <>
              <button className="btn btn-primary" onClick={handleSave}>
                <Save size={16} /> Save
              </button>
              <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                <X size={16} /> Cancel
              </button>
            </>
          ) : (
            <button className="btn btn-secondary" onClick={() => { setEditScore(scoreData.overallScore); setIsEditing(true); }}>
              <Settings size={16} /> Edit Score
            </button>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="section-title">Score Factors</div>
      
      <div className="card">
        {scoreData.factors.map((factor, index) => (
          <div key={index} className="factor-row">
            <div className="factor-info">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                <span style={{ color: 'var(--tesla-green)' }}>{factor.icon}</span>
                <div className="factor-name">{factor.name}</div>
              </div>
              <div className="factor-desc">{factor.description}</div>
              <div className="tip-box">{factor.tip}</div>
            </div>
            <div className="factor-metric">
              <div className={`factor-value ${getFactorStatus(factor.currentValue, factor.cap)}`}>
                {factor.currentValue.toFixed(1)}%
              </div>
              <div className="factor-cap">of {factor.cap}% cap</div>
            </div>
          </div>
        ))}
      </div>

      {/* Insights */}
      <div className="card">
        <div className="section-title" style={{ marginTop: 0, marginBottom: '16px' }}>
          <Car size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
          Why Your Score Changes
        </div>
        
        <div className="list-item">
          <span className="list-icon"><Car size={16} /></span>
          <span>Autopilot miles generally don't count toward most metrics, but you're still responsible for the vehicle</span>
        </div>
        <div className="list-item">
          <span className="list-icon"><Moon size={16} /></span>
          <span>Late night driving (10pm-4am) has weighted impact — later hours hurt more</span>
        </div>
        <div className="list-item">
          <span className="list-icon"><Gauge size={16} /></span>
          <span>Excessive speeding now considers relative speed — going 20% faster than traffic triggers it</span>
        </div>
        <div className="list-item">
          <span className="list-icon"><Timer size={16} /></span>
          <span>Score is a 30-day rolling average — newer drives have more impact</span>
        </div>
      </div>

      {/* Quick Wins */}
      <div className="card">
        <div className="section-title" style={{ marginTop: 0, marginBottom: '16px' }}>
          <Lightbulb size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
          Quick Wins
        </div>
        
        <div className="list-item">
          <span className="list-icon"><Shield size={16} /></span>
          <span>Set following distance to max (7) in your Tesla</span>
        </div>
        <div className="list-item">
          <span className="list-icon"><Car size={16} /></span>
          <span>Use Autopilot on highways — it maintains consistent behavior</span>
        </div>
        <div className="list-item">
          <span className="list-icon"><Moon size={16} /></span>
          <span>Avoid driving between 12am-4am when possible</span>
        </div>
      </div>

      {/* History Toggle */}
      <button 
        className="btn btn-secondary" 
        onClick={() => setShowHistory(!showHistory)}
        style={{ width: '100%', marginTop: '8px' }}
      >
        <History size={16} />
        {showHistory ? 'Hide History' : 'Show Score History'}
      </button>

      {showHistory && <ScoreHistory />}
    </div>
  )
}

export default SafetyScore