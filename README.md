# Nidra — Clinical Sleep Assessment (Web Application)

A pixel-perfect, interactive clinical sleep assessment web application designed for comprehensive sleep health screening, risk stratification, and patient intake. Built to match native iOS aesthetics with high tactile feedback, micro-animations, real-time validation, and automated Supabase cloud sync.

---

## ✨ Features

- **23-Screen Clinical Intake Workflow**: Covers full diagnostic sleep questionnaires (About You, Sleep Problems, Snoring & Apnea, Morning Feelings, Daytime Somnolence & Naps, Driving Safety, Restless Legs Syndrome, Diagnosed Health Conditions, Anthropometrics, Blood Pressure, and Daily Habits).
- **Responsive Mobile & Desktop Viewports**: Fluid iOS-styled card container designed for smooth mobile interaction with interactive sliders, numeric steppers, and spring animations.
- **Dynamic Risk Stratification & Asian-Indian BMI Calculator**: Real-time BMI computation and threshold classification.
- **Automated Supabase Cloud Sync**: Instant persistent submission into `sleep_assessments` database table upon completion with feedback state handling.
- **Strict User Validation**: Production-ready real-user mode requiring field validation before advancing through stages.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm / pnpm / yarn

### Installation
```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build
```

---

## 🛠️ Tech Stack
- **Framework**: React 19 + Vite 8
- **Icons**: Lucide React
- **Backend / Database**: Supabase JS Client (`@supabase/supabase-js`)
- **Effects**: Canvas Confetti
- **Styling**: Vanilla CSS (Custom Design System with fluid transitions)

