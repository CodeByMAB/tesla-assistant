import { useState, useEffect } from 'react'
import { Calculator, Zap, DollarSign, Clock } from 'lucide-react'

function ChargingCalculator({ defaultBatterySize }: { defaultBatterySize?: number }) {
  const [batterySize, setBatterySize] = useState(defaultBatterySize || 82) // kWh (Model Y LR)
  const [currentSoc, setCurrentSoc] = useState(20) // %
  const [targetSoc, setTargetSoc] = useState(80) // %
  const [electricityRate, setElectricityRate] = useState(0.13) // $/kWh

  // Update battery size when vehicle changes
  useEffect(() => {
    if (defaultBatterySize) {
      setBatterySize(defaultBatterySize)
    }
  }, [defaultBatterySize])

  const kwhNeeded = (batterySize * (targetSoc - currentSoc) / 100)
  const estimatedCost = kwhNeeded * electricityRate
  const chargingTime = Math.round(kwhNeeded / 11) // Assuming 11kW home charger
  const superchargerTime = Math.round(kwhNeeded / 150 * 60) // 150kW max

  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
        <Calculator size={18} style={{ color: 'var(--tesla-blue)' }} />
        <span style={{ fontWeight: '600', fontSize: '15px' }}>Charging Calculator</span>
      </div>

      <div className="input-group">
        <label className="input-label">Battery Size (kWh)</label>
        <input
          type="range"
          min="50"
          max="120"
          value={batterySize}
          onChange={(e) => setBatterySize(parseInt(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--tesla-green)' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--tesla-gray)' }}>
          <span>50</span>
          <span style={{ color: 'var(--tesla-white)', fontWeight: '600' }}>{batterySize} kWh</span>
          <span>120</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
        <div className="input-group" style={{ marginBottom: 0 }}>
          <label className="input-label">Current %</label>
          <input
            type="number"
            value={currentSoc}
            onChange={(e) => setCurrentSoc(Math.max(0, Math.min(100, parseInt(e.target.value) || 0)))}
            className="input-field"
            style={{ padding: '12px' }}
          />
        </div>
        <div className="input-group" style={{ marginBottom: 0 }}>
          <label className="input-label">Target %</label>
          <input
            type="number"
            value={targetSoc}
            onChange={(e) => setTargetSoc(Math.max(0, Math.min(100, parseInt(e.target.value) || 0)))}
            className="input-field"
            style={{ padding: '12px' }}
          />
        </div>
      </div>

      <div className="input-group">
        <label className="input-label">Electricity Rate ($/kWh)</label>
        <input
          type="number"
          step="0.01"
          value={electricityRate}
          onChange={(e) => setElectricityRate(parseFloat(e.target.value) || 0)}
          className="input-field"
          style={{ padding: '12px' }}
        />
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '12px', 
        marginTop: '20px',
        padding: '16px',
        background: 'var(--tesla-dark)',
        borderRadius: 'var(--radius-md)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <Zap size={20} style={{ color: 'var(--tesla-yellow)', marginBottom: '4px' }} />
          <div style={{ fontSize: '18px', fontWeight: '700' }}>{kwhNeeded.toFixed(1)}</div>
          <div style={{ fontSize: '11px', color: 'var(--tesla-gray)' }}>kWh</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <DollarSign size={20} style={{ color: 'var(--tesla-green)', marginBottom: '4px' }} />
          <div style={{ fontSize: '18px', fontWeight: '700' }}>${estimatedCost.toFixed(2)}</div>
          <div style={{ fontSize: '11px', color: 'var(--tesla-gray)' }}>Cost</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Clock size={20} style={{ color: 'var(--tesla-blue)', marginBottom: '4px' }} />
          <div style={{ fontSize: '18px', fontWeight: '700' }}>{chargingTime}h</div>
          <div style={{ fontSize: '11px', color: 'var(--tesla-gray)' }}>Home Time</div>
        </div>
      </div>

      <div className="tip-box" style={{ marginTop: '12px' }}>
        At Supercharger (150kW): ~{superchargerTime} min to {targetSoc}%
      </div>
    </div>
  )
}

export default ChargingCalculator