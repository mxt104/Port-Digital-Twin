/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Base surfaces — light theme
        'bg-base':     '#f1f5f9',   // slate-100
        'bg-surface':  '#ffffff',   // white
        'bg-elevated': '#f8fafc',   // slate-50
        'bg-card':     '#ffffff',   // white

        // Borders
        'border-subtle':  '#e2e8f0',   // slate-200
        'border-default': '#cbd5e1',   // slate-300
        'border-strong':  '#94a3b8',   // slate-400

        // Accent / Brand — blue
        'accent-primary': '#1d4ed8',   // blue-700
        'accent-hover':   '#2563eb',   // blue-600
        'accent-muted':   '#3b82f6',   // blue-500

        // Operational status colours
        'status-import':        '#1d4ed8',   // blue-700
        'status-export':        '#16a34a',   // green-600
        'status-transshipment': '#7c3aed',   // violet-600
        'status-gate-in':       '#0891b2',   // cyan-600
        'status-gate-out':      '#0f766e',   // teal-700
        'status-customs-hold':  '#dc2626',   // red-600
        'status-inspection':    '#ea580c',   // orange-600
        'status-empty':         '#64748b',   // slate-500
        'status-loaded':        '#4f46e5',   // indigo-600

        // Aliases used by generic components
        'status-available':    '#16a34a',
        'status-occupied':     '#1d4ed8',
        'status-reserved':     '#d97706',
        'status-maintenance':  '#dc2626',

        // Text
        'text-primary':   '#0f172a',   // slate-900
        'text-secondary': '#334155',   // slate-700
        'text-muted':     '#64748b',   // slate-500
        'text-disabled':  '#94a3b8',   // slate-400

        // AQI condition colours
        'aqi-good':     '#16a34a',
        'aqi-moderate': '#d97706',
        'aqi-poor':     '#dc2626',
        'aqi-critical': '#7f1d1d',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
      },
      spacing: {
        sidebar: '220px',
        topbar:  '52px',
      },
      borderRadius: {
        sm:      '4px',
        DEFAULT: '6px',
        md:      '8px',
        lg:      '12px',
      },
      boxShadow: {
        card:  '0 1px 3px 0 rgba(0,0,0,0.07), 0 1px 2px -1px rgba(0,0,0,0.05)',
        panel: '0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.05)',
        glow:  '0 0 12px rgba(29,78,216,0.18)',
      },
    },
  },
  plugins: [],
}
