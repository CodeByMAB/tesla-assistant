import { useState } from 'react'
import SafetyScore from './components/SafetyScore'
import ChargingStations from './components/ChargingStations'
import Products from './components/Products'

type Tab = 'score' | 'charging' | 'products'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('score')

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
          className={`nav-btn ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
        >
          Products
        </button>
      </nav>

      <main className="content">
        {activeTab === 'score' && <SafetyScore />}
        {activeTab === 'charging' && <ChargingStations />}
        {activeTab === 'products' && <Products />}
      </main>

      <footer className="footer">
        <p>🦀 Built with OpenClaw</p>
      </footer>
    </div>
  )
}

export default App