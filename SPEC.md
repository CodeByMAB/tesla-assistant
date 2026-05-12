# Tesla Assistant - Specification

## Project Overview
- **Name**: Tesla Assistant
- **Type**: PWA (Progressive Web App)
- **Core Functionality**: Driving score analysis, charging optimization, and product recommendations for Tesla owners
- **Target Users**: Tesla owners who want to optimize their driving score and charging costs

## Problem Space

### Pain Points to Solve
1. **Driving Score Mystery** - "Why is my score dropping even with Autopilot?"
2. **Charging Cost Optimization** - "When/where should I charge?"
3. **Product Buying Decisions** - "What should I actually buy?"

## Features

### 1. Safety Score Analyzer
- Display the 5 key factors from Tesla Safety Score v2.2
- Explain each factor in plain language
- Provide actionable tips for improvement
- Track score history (manual entry to start)

**Safety Score Factors (v2.2):**
| Factor | Description | Cap |
|--------|-------------|-----|
| Forward Collision Warnings | Removed in v2.2 (April 2025) | N/A |
| Hard Braking | % of time braking with excessive force (no Autopilot) | 5.2% |
| Aggressive Turning | Left/right acceleration > 0.4g | 13.2% |
| Excessive Speeding | >85mph OR >20% faster than traffic ahead | 30% |
| Unsafe Following Time | Following distance < 1.3s | 7.2% |
| Late Night Driving | 10pm-12am (weighted), 12am-4am (heavier) | 15% |

### 2. Charging Optimizer (MVP: Local Area)
- List of Tesla Superchargers with pricing
- Time-of-use electricity rate context
- Best times to charge (supercharger vs home)
- Weather-aware range recommendations

**Supercharger Rates (Example):**
| Location | Stalls | Max kW | Off-Peak Rate | Peak Rate |
|----------|--------|--------|---------------|-----------|
| Station A | 16 | 250kW | $0.32/kWh | $0.40/kWh |
| Station B | 8 | 250kW | $0.35/kWh | $0.55/kWh |

### 3. Product Recommendations
- Curated list of accessories that actually impact driving score/ownership
- Prioritized by impact and cost

## Technical Stack
- React + TypeScript
- PWA (service worker, offline-first)
- Local storage for data persistence
- Bitcoin-denominated pricing (sats-native optional)

## OpenClaw Integration
- **Continuous Monitoring**: Poll for driving score (future: Tesla API)
- **Smart Notifications**: "Your score dropped 2 points - hard braking detected Tuesday"
- **Charging Suggestions**: "Best time to charge today: 4-8am at Pine Ridge ($0.32/kWh)"
- **Learning**: Track what improvements actually work

## GitHub & Social
- Open source under MIT license
- Share on X/Twitter with @elonmusk mention target
- Build in public, iterate based on feedback

## MVP Scope
- [x] Safety Score factor breakdown
- [x] Naples Supercharger list with pricing
- [x] Basic tips for score improvement
- [ ] Charging cost calculator
- [ ] Score history tracking
- [ ] Tesla API integration (future)