import { useState, useEffect } from 'react'
import { Car, Settings, Save, X, Zap, Battery } from 'lucide-react'

interface Vehicle {
  id: string
  name: string
  year: number
  model: string
  variant: string
  batterySize: number // kWh
}

const vehiclePresets: Omit<Vehicle, 'id'>[] = [
  { name: 'Model S', year: 2024, model: 'Model S', variant: 'Plaid', batterySize: 100 },
  { name: 'Model S', year: 2024, model: 'Model S', variant: 'Long Range', batterySize: 100 },
  { name: 'Model 3', year: 2024, model: 'Model 3', variant: 'Performance', batterySize: 82 },
  { name: 'Model 3', year: 2024, model: 'Model 3', variant: 'Long Range', batterySize: 82 },
  { name: 'Model 3', year: 2024, model: 'Model 3', variant: 'RWD', batterySize: 60 },
  { name: 'Model X', year: 2024, model: 'Model X', variant: 'Plaid', batterySize: 100 },
  { name: 'Model X', year: 2024, model: 'Model X', variant: 'Long Range', batterySize: 100 },
  { name: 'Model Y', year: 2024, model: 'Model Y', variant: 'Performance', batterySize: 82 },
  { name: 'Model Y', year: 2024, model: 'Model Y', variant: 'Long Range', batterySize: 82 },
  { name: 'Model Y', year: 2024, model: 'Model Y', variant: 'RWD', batterySize: 60 },
]

export function useVehicle() {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('tesla-vehicle')
    if (saved) {
      setVehicle(JSON.parse(saved))
    }
  }, [])

  const saveVehicle = (v: Vehicle) => {
    setVehicle(v)
    localStorage.setItem('tesla-vehicle', JSON.stringify(v))
    setIsEditing(false)
  }

  const clearVehicle = () => {
    setVehicle(null)
    localStorage.removeItem('tesla-vehicle')
  }

  return { vehicle, isEditing, setIsEditing, saveVehicle, clearVehicle }
}

function VehicleSelector({ vehicle, onSave, onCancel }: { 
  vehicle: Vehicle | null
  onSave: (v: Vehicle) => void
  onCancel: () => void
}) {
  const [selectedPreset, setSelectedPreset] = useState(0)
  const [customBattery, setCustomBattery] = useState(vehicle?.batterySize || 82)

  const currentPreset = vehiclePresets[selectedPreset]

  const handleSave = () => {
    onSave({
      id: crypto.randomUUID(),
      name: `${currentPreset.model} ${currentPreset.variant}`,
      year: currentPreset.year,
      model: currentPreset.model,
      variant: currentPreset.variant,
      batterySize: customBattery
    })
  }

  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
        <Car size={18} style={{ color: 'var(--tesla-blue)' }} />
        <span style={{ fontWeight: '600', fontSize: '15px' }}>Select Your Vehicle</span>
      </div>

      {/* Preset Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '8px', 
        marginBottom: '16px' 
      }}>
        {vehiclePresets.map((preset, i) => (
          <button
            key={i}
            onClick={() => { setSelectedPreset(i); setCustomBattery(preset.batterySize); }}
            style={{
              padding: '12px',
              background: selectedPreset === i ? 'rgba(62,158,62,0.15)' : 'var(--tesla-dark)',
              border: selectedPreset === i ? '1px solid var(--tesla-green)' : '1px solid rgba(255,255,255,0.1)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--tesla-white)',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ fontWeight: '600', fontSize: '13px' }}>{preset.model}</div>
            <div style={{ fontSize: '11px', color: 'var(--tesla-gray)' }}>{preset.variant}</div>
          </button>
        ))}
      </div>

      {/* Battery Size Override */}
      <div className="input-group">
        <label className="input-label">
          <Battery size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
          Battery Size (kWh)
        </label>
        <input
          type="range"
          min="50"
          max="120"
          value={customBattery}
          onChange={(e) => setCustomBattery(parseInt(e.target.value))}
          style={{ width: '100%' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--tesla-gray)' }}>
          <span>50</span>
          <span style={{ color: 'var(--tesla-green)', fontWeight: '600' }}>{customBattery} kWh</span>
          <span>120</span>
        </div>
      </div>

      {/* Preview */}
      <div style={{ 
        padding: '16px', 
        background: 'var(--tesla-dark)', 
        borderRadius: 'var(--radius-md)',
        marginBottom: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Car size={32} style={{ color: 'var(--tesla-blue)' }} />
          <div>
            <div style={{ fontWeight: '600', fontSize: '16px' }}>{currentPreset.year} {currentPreset.model}</div>
            <div style={{ fontSize: '13px', color: 'var(--tesla-gray)' }}>{currentPreset.variant}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
              <Zap size={14} style={{ color: 'var(--tesla-green)' }} />
              <span style={{ fontSize: '14px', fontWeight: '600' }}>{customBattery} kWh</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <button className="btn btn-primary" onClick={handleSave} style={{ flex: 1 }}>
          <Save size={16} /> Save Vehicle
        </button>
        <button className="btn btn-secondary" onClick={onCancel}>
          <X size={16} />
        </button>
      </div>
    </div>
  )
}

function VehicleDisplay({ vehicle, onEdit }: { 
  vehicle: Vehicle
  onEdit: () => void 
}) {
  return (
    <div 
      className="card" 
      onClick={onEdit}
      style={{ cursor: 'pointer' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '48px',
          height: '48px',
          background: 'linear-gradient(135deg, var(--tesla-blue) 0%, #2d5aa0 100%)',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Car size={24} color="white" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: '600', fontSize: '16px' }}>{vehicle.year} {vehicle.model}</div>
          <div style={{ fontSize: '13px', color: 'var(--tesla-gray)' }}>{vehicle.variant}</div>
        </div>
        <Settings size={18} style={{ color: 'var(--tesla-gray)' }} />
      </div>
      <div style={{ 
        display: 'flex', 
        gap: '16px', 
        marginTop: '12px', 
        paddingTop: '12px', 
        borderTop: '1px solid rgba(255,255,255,0.06)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Battery size={16} style={{ color: 'var(--tesla-green)' }} />
          <span style={{ fontSize: '13px' }}>{vehicle.batterySize} kWh</span>
        </div>
        <div style={{ fontSize: '12px', color: 'var(--tesla-gray)' }}>
          Tap to change
        </div>
      </div>
    </div>
  )
}

export { VehicleSelector, VehicleDisplay }