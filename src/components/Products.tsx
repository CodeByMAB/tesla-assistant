import { 
  Usb,
  Sun,
  Plug,
  Car,
  Shield,
  GlassWater,
  Palette,
  Package,
  ShoppingBag,
  Star,
  ArrowRight,
  TrendingDown,
  Home
} from 'lucide-react'

interface Product {
  name: string
  price: string
  icon: React.ReactNode
  reason: string
  impact: 'high' | 'medium' | 'low'
}

const products: Product[] = [
  {
    name: 'Tesla USB Drive\n(128GB)',
    price: '$35',
    icon: <Usb size={28} />,
    reason: 'Enable Sentry Mode, Dashcam, Track Mode',
    impact: 'high'
  },
  {
    name: 'Ceramic Window\nTint',
    price: '$300-600',
    icon: <Sun size={28} />,
    reason: 'Reduce heat, protect interior, efficiency',
    impact: 'high'
  },
  {
    name: 'Wall Connector',
    price: '$425',
    icon: <Plug size={28} />,
    reason: '44mi/hr home charging, scheduling',
    impact: 'high'
  },
  {
    name: 'All-Weather\nFloor Mats',
    price: '$165',
    icon: <Car size={28} />,
    reason: 'Protect carpet, easier cleaning',
    impact: 'medium'
  },
  {
    name: 'Tire Repair Kit',
    price: '$50-80',
    icon: <Shield size={28} />,
    reason: 'Self-sufficient for flats',
    impact: 'medium'
  },
  {
    name: 'Glass Protective\nFilm',
    price: '$30-50',
    icon: <GlassWater size={28} />,
    reason: 'Protect windshield from chips',
    impact: 'medium'
  },
  {
    name: 'Center Console\nWrap',
    price: '$40-80',
    icon: <Palette size={28} />,
    reason: 'Prevent scratching, aesthetics',
    impact: 'low'
  },
  {
    name: 'Frunk Organizer',
    price: '$35',
    icon: <Package size={28} />,
    reason: 'Organize cables, emergency kit',
    impact: 'low'
  }
]

function Products() {
  return (
    <div className="products">
      {/* Recommendations Grid */}
      <div className="section-title">
        <ShoppingBag size={16} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
        Recommended
      </div>
      
      <div className="products-grid">
        {products.map((product, index) => (
          <div key={index} className="product-card">
            <div className="product-icon">{product.icon}</div>
            <div className="product-name">{product.name}</div>
            <div className="product-price">{product.price}</div>
            <span className={`product-impact ${product.impact}`}>
              {product.impact === 'high' ? 'High Impact' : product.impact === 'medium' ? 'Medium' : 'Nice to Have'}
            </span>
          </div>
        ))}
      </div>

      {/* What NOT to Buy */}
      <div className="card">
        <div className="section-title" style={{ marginTop: 0, marginBottom: '16px' }}>
          <TrendingDown size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
          Skip These
        </div>
        
        <div className="list-item">
          <span className="list-icon"><Shield size={16} /></span>
          <span><strong>Aftermarket Screen Protectors</strong> — May interfere with camera sensors</span>
        </div>
        <div className="list-item">
          <span className="list-icon"><Plug size={16} /></span>
          <span><strong>Non-Tesla Wall Connectors</strong> — Less integration, warranty concerns</span>
        </div>
        <div className="list-item">
          <span className="list-icon"><Car size={16} /></span>
          <span><strong>Third-Party Seat Covers</strong> — Can trigger occupancy sensor issues</span>
        </div>
        <div className="list-item">
          <span className="list-icon"><Shield size={16} /></span>
          <span><strong>Magnetic Phone Mounts</strong> — Interferes with center console</span>
        </div>
      </div>

      {/* Score-Specific Advice */}
      <div className="card">
        <div className="section-title" style={{ marginTop: 0, marginBottom: '16px' }}>
          <Star size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
          For Your Score
        </div>
        
        <div style={{ fontSize: '14px', color: 'var(--tesla-gray)', lineHeight: '1.6' }}>
          <p style={{ marginBottom: '12px' }}>
            No accessory directly improves your Safety Score — it comes down to 
            <strong style={{ color: 'var(--tesla-white)' }}> driving behavior</strong>.
          </p>
          <p style={{ marginBottom: '12px' }}>
            However, these <em>indirectly</em> help:
          </p>
        </div>

        <div className="list-item">
          <span className="list-icon"><Home size={16} /></span>
          <span><strong>Wall Connector</strong> → Charge at home, less Supercharger stress</span>
        </div>
        <div className="list-item">
          <span className="list-icon"><Sun size={16} /></span>
          <span><strong>Window Tint</strong> → Better visibility, less glare-induced braking</span>
        </div>
        <div className="list-item">
          <span className="list-icon"><Usb size={16} /></span>
          <span><strong>Dashcam USB</strong> → Review your driving incidents</span>
        </div>
      </div>

      {/* Future Features */}
      <div className="card" style={{ background: 'linear-gradient(135deg, rgba(74,144,217,0.1) 0%, rgba(74,144,217,0.05) 100%)', border: '1px solid rgba(74,144,217,0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <ArrowRight size={18} style={{ color: 'var(--tesla-blue)' }} />
          <span style={{ fontWeight: '600' }}>Coming Soon</span>
        </div>
        <div style={{ fontSize: '13px', color: 'var(--tesla-gray)', lineHeight: '1.5' }}>
          • Price tracking with price drop alerts<br/>
          • Integration with Amazon for purchasing<br/>
          • User reviews and recommendations<br/>
          • Sats-denominated pricing for Bitcoiners ⚡
        </div>
      </div>
    </div>
  )
}

export default Products