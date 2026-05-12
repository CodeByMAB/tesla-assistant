import { useState, useEffect } from 'react'
import { 
  Zap, 
  MapPin, 
  Plug,
  Home,
  TrendingUp,
  PlugZap
} from 'lucide-react'

interface ChargingStation {
  name: string
  address: string
  stalls: number
  maxKw: number
  rates: {
    offPeak: string
    peak: string
    hours: string
  }
  tips: string[]
}

const stations: ChargingStation[] = [
  {
    name: 'Pine Ridge Road',
    address: 'Naples, FL 34109',
    stalls: 16,
    maxKw: 250,
    rates: {
      offPeak: '$0.32',
      peak: '$0.40',
      hours: 'Off-peak: 12-4am, 4-8am | Peak: 8am-10pm'
    },
    tips: [
      'Best overall value in Naples',
      'Most stalls - lower wait times',
      'Near Whole Foods for shopping'
    ]
  },
  {
    name: 'Tarpon Bay Boulevard',
    address: 'Naples, FL 34119',
    stalls: 8,
    maxKw: 250,
    rates: {
      offPeak: '$0.35',
      peak: '$0.55',
      hours: 'Off-peak: 12-4am, 10pm-12am | Peak: 8am-10pm'
    },
    tips: [
      'Avoid peak hours — rate jumps to $0.55!',
      'Good for late night charging',
      'Fewer stalls = possible waits'
    ]
  },
  {
    name: 'Premier Way',
    address: 'Naples, FL 34109',
    stalls: 12,
    maxKw: 250,
    rates: {
      offPeak: '$0.35',
      peak: '$0.40',
      hours: 'Off-peak: 11pm-12am, 4-11am | Peak: 11am-11pm'
    },
    tips: [
      'Wide off-peak window (4-11am)',
      'Mid-range pricing',
      'Near shopping district'
    ]
  },
  {
    name: 'Bayfront Place',
    address: '499 Bayfront Place, Naples',
    stalls: 8,
    maxKw: 150,
    rates: {
      offPeak: 'Standard',
      peak: 'Standard',
      hours: 'Standard Tesla rates'
    },
    tips: [
      'Older station - 150kW max',
      'Scenic waterfront location',
      'Combine with bayfront dining'
    ]
  }
]

function ChargingStations() {
  const [currentHour, setCurrentHour] = useState(new Date().getHours())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHour(new Date().getHours())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  const isPeakHour = currentHour >= 8 && currentHour < 22
  const currentTimeStr = new Date().toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  })

  const getRecommendation = () => {
    if (!isPeakHour) {
      return {
        station: 'Pine Ridge Road',
        reason: 'Lowest off-peak rate ($0.32/kWh)'
      }
    }
    return {
      station: 'Premier Way',
      reason: 'Lowest peak rate among open stations'
    }
  }

  const recommendation = getRecommendation()

  return (
    <div className="charging">
      {/* Current Status */}
      <div className="status-bar">
        <div>
          <div className="status-time">{currentTimeStr}</div>
          <div style={{ fontSize: '12px', color: 'var(--tesla-gray)' }}>Naples, FL</div>
        </div>
        <div className={`status-badge ${isPeakHour ? 'peak' : 'off-peak'}`}>
          {isPeakHour ? <Zap size={14} /> : <PlugZap size={14} />}
          {isPeakHour ? 'Peak Rates' : 'Off-Peak'}
        </div>
      </div>

      {/* Recommendation Card */}
      <div className="card" style={{ background: 'linear-gradient(135deg, rgba(62,158,62,0.15) 0%, rgba(62,158,62,0.05) 100%)', border: '1px solid rgba(62,158,62,0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <TrendingUp size={24} style={{ color: 'var(--tesla-green)' }} />
          <span style={{ fontSize: '15px', fontWeight: '600' }}>Recommended Right Now</span>
        </div>
        <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--tesla-green)', marginBottom: '4px' }}>
          {recommendation.station}
        </div>
        <div style={{ fontSize: '13px', color: 'var(--tesla-gray)' }}>
          {recommendation.reason}
        </div>
      </div>

      {/* Station Cards */}
      <div className="section-title">
        <MapPin size={16} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
        Superchargers
      </div>

      {stations.map((station, index) => {
        const stationIsPeak = currentHour >= 8 && currentHour < 22
        return (
          <div key={index} className="station-card">
            <div className="station-header">
              <div className="station-name">{station.name}</div>
              <div className={`station-badge ${stationIsPeak ? 'peak' : 'off-peak'}`}>
                {stationIsPeak ? 'Peak' : 'Off-Peak'}
              </div>
            </div>
            
            <div className="station-meta">
              <span><Plug size={14} /> {station.stalls} stalls</span>
              <span><Zap size={14} /> {station.maxKw}kW max</span>
            </div>

            <div className="station-pricing">
              <div className="price-block">
                <div className="price-label">Off-Peak</div>
                <div className="price-value low">{station.rates.offPeak}</div>
              </div>
              <div className="price-block">
                <div className="price-label">Peak</div>
                <div className="price-value high">{station.rates.peak}</div>
              </div>
            </div>

            {station.tips.map((tip, i) => (
              <div key={i} className="tip-box" style={{ marginTop: '12px', padding: '10px 12px' }}>
                {tip}
              </div>
            ))}
          </div>
        )
      })}

      {/* Home Charging */}
      <div className="card">
        <div className="section-title" style={{ marginTop: 0, marginBottom: '16px' }}>
          <Home size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
          Home Charging
        </div>
        
        <div className="station-pricing" style={{ border: 'none', paddingTop: 0 }}>
          <div className="price-block">
            <div className="price-label">LCEC Rate</div>
            <div className="price-value low">$0.12-0.14</div>
          </div>
          <div className="price-block">
            <div className="price-label">Per kWh</div>
            <div style={{ fontSize: '12px', color: 'var(--tesla-gray)', marginTop: '4px' }}>
              Always cheapest option
            </div>
          </div>
        </div>

        <div className="tip-box">
          Pro tip: Set departure time to 4-8am for cheapest rates + pre-conditioned battery
        </div>
      </div>

      {/* API Notice */}
      <div className="card" style={{ background: 'rgba(74,144,217,0.1)', border: '1px solid rgba(74,144,217,0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <Plug size={18} style={{ color: 'var(--tesla-blue)' }} />
          <span style={{ fontWeight: '600' }}>API Integration Coming Soon</span>
        </div>
        <div style={{ fontSize: '13px', color: 'var(--tesla-gray)', lineHeight: '1.5' }}>
          Tesla removed Safety Score from third-party apps in December 2023. 
          We're exploring Fleet API integration for live data. For now, 
          manually update your score above.
        </div>
      </div>
    </div>
  )
}

export default ChargingStations