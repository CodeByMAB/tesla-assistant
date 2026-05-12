import { useState } from 'react'
import SafetyScore from './components/SafetyScore'
import ChargingStations from './components/ChargingStations'
import Products from './components/Products'
import { VehicleSelector, VehicleDisplay, useVehicle } from './components/VehicleManager'

type Tab = 'score' | 'charging' | 'products' | 'vehicle'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('score')
  const { vehicle, isEditing, setIsEditing, saveVehicle } = useVehicle()

  return (
    <div className="app">
      <header className="header">
        <div className="logo-container">
          <div className="logo-t">T</div>
          <span className="logo-text">Tesla Assistant</span>
        </div>
      </header>

      <nav className="nav">
        <button 
          className={`nav-btn ${activeTab === 'score' ? 'active' : ''}`}
          onClick={() => setActiveTab('score')}
        >
          Score
        </button>
        <button 
          className={`nav-btn ${activeTab === 'charging' ? 'active' : ''}`}
          onClick={() => setActiveTab('charging')}
        >
          Charging
        </button>
        <button 
          className={`nav-btn ${activeTab === 'vehicle' ? 'active' : ''}`}
          onClick={() => setActiveTab('vehicle')}
        >
          Vehicle
        </button>
        <button 
          className={`nav-btn ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          Products
        </button>
      </nav>

      <main className="content">
        {activeTab === 'score' && <SafetyScore />}
        {activeTab === 'charging' && <ChargingStations vehicleBatterySize={vehicle?.batterySize} />}
        {activeTab === 'products' && <Products />}
        {activeTab === 'vehicle' && (
          <div className="vehicle-tab">
            {!vehicle || isEditing ? (
              <VehicleSelector 
                vehicle={vehicle}
                onSave={saveVehicle}
                onCancel={() => setIsEditing(false)}
              />
            ) : (
              <VehicleDisplay 
                vehicle={vehicle}
                onEdit={() => setIsEditing(true)}
              />
            )}
            
            {vehicle && !isEditing && (
              <div className="card" style={{ marginTop: '16px' }}>
                <div className="section-title" style={{ marginTop: 0, marginBottom: '12px' }}>
                  Vehicle Specs
                </div>
                <div className="list-item">
                  <span className="list-icon">⚡</span>
                  <span><strong>Battery:</strong> {vehicle.batterySize} kWh</span>
                </div>
                <div className="list-item">
                  <span className="list-icon">🔌</span>
                  <span><strong>Home Charging:</strong> Up to 11kW (48A)</span>
                </div>
                <div className="list-item">
                  <span className="list-icon">⚡</span>
                  <span><strong>Supercharger:</strong> Up to 250kW</span>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="footer">
        <p>🦀 Built with OpenClaw</p>
      </footer>
    </div>
  )
}

export default App