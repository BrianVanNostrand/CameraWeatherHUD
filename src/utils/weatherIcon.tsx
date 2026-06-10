export type WeatherIconProps = {
    code: number
    size?: number
    animated?: boolean
  }
  
  function Sun({ size }: { size: number }) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="4" fill="currentColor" />
        <g stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="1" x2="12" y2="4" />
          <line x1="12" y1="20" x2="12" y2="23" />
          <line x1="1" y1="12" x2="4" y2="12" />
          <line x1="20" y1="12" x2="23" y2="12" />
        </g>
      </svg>
    )
  }
  
  function Cloud({ size }: { size: number }) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path
          d="M7 18h10a4 4 0 0 0 0-8 5 5 0 0 0-9.7-1.5A3.5 3.5 0 0 0 7 18z"
          fill="currentColor"
        />
      </svg>
    )
  }
  
  function Rain({ size }: { size: number }) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path
          d="M7 16h10a4 4 0 0 0 0-8 5 5 0 0 0-9.7-1.5A3.5 3.5 0 0 0 7 16z"
          fill="currentColor"
        />
        <line x1="8" y1="18" x2="8" y2="22" stroke="currentColor" strokeWidth="2" />
        <line x1="12" y1="18" x2="12" y2="22" stroke="currentColor" strokeWidth="2" />
        <line x1="16" y1="18" x2="16" y2="22" stroke="currentColor" strokeWidth="2" />
      </svg>
    )
  }
  
  function Storm({ size }: { size: number }) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path
          d="M7 16h10a4 4 0 0 0 0-8 5 5 0 0 0-9.7-1.5A3.5 3.5 0 0 0 7 16z"
          fill="currentColor"
        />
        <polygon
          points="13,16 10,23 14,23 12,29"
          fill="currentColor"
          transform="scale(0.6) translate(6,-2)"
        />
      </svg>
    )
  }
  
  function Snow({ size }: { size: number }) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path
          d="M7 16h10a4 4 0 0 0 0-8 5 5 0 0 0-9.7-1.5A3.5 3.5 0 0 0 7 16z"
          fill="currentColor"
        />
        <g stroke="currentColor" strokeWidth="2">
          <line x1="8" y1="18" x2="8" y2="18" />
          <line x1="12" y1="18" x2="12" y2="18" />
          <line x1="16" y1="18" x2="16" y2="18" />
        </g>
      </svg>
    )
  }
  
  function Mist({ size }: { size: number }) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <g stroke="currentColor" strokeWidth="2">
          <line x1="4" y1="8" x2="20" y2="8" />
          <line x1="6" y1="12" x2="18" y2="12" />
          <line x1="4" y1="16" x2="20" y2="16" />
        </g>
      </svg>
    )
  }
  function getIcon(rawCode: number | string) {
    const code = Number(rawCode)
    console.log(code)
    if (code === 0) return Sun
  
    if ([1, 2].includes(code)) return Cloud
  
    if ([3].includes(code)) return Cloud
  
    if ([45, 48].includes(code)) return Mist
  
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code))
      return Rain
  
    if ([95, 96, 99].includes(code))
      return Storm
  
    if ([71, 73, 75].includes(code))
      return Snow
  
    return Cloud
  }
  export default function WeatherIcon({
    code,
    size = 32,
    animated = true
  }: WeatherIconProps) {
    const Icon = getIcon(code)
  
    return (
      <div
        style={{
          color: 'currentColor',
          display: 'inline-flex',
          animation: animated ? 'float 3s ease-in-out infinite' : undefined
        }}
      >
        <Icon size={size} />
      </div>
    )
  }