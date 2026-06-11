import { useEffect, useMemo, useState } from 'react'
import { getMoonPhase } from '../utils/moonphase'

const WEATHER_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=47.04&longitude=-122.90&current=temperature_2m,wind_speed_10m,wind_direction_10m,apparent_temperature,weathercode,us_aqi&hourly=rain,temperature_2m,precipitation_probability,snowfall&daily=sunrise,rain_sum,sunset&timezone=auto&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&models=ecmwf_ifs'

/* ---------------- ICON ---------------- */
function getWeatherIcon(code) {
  if (code === 0) return '☀️'
  if ([1, 2, 3].includes(code)) return '⛅'
  if ([45, 48].includes(code)) return '🌫️'
  if ([51, 53, 55, 56, 57].includes(code)) return '🌦️'
  if ([61, 63, 65].includes(code)) return '🌧️'
  if ([71, 73, 75, 77].includes(code)) return '🌨️'
  if ([80, 81, 82].includes(code)) return '🌦️'
  if ([95, 96, 99].includes(code)) return '⛈️'
  return '🌡️'
}

/* ---------------- AQI ---------------- */
function getAQI(aqi) {
  if (aqi == null) return { label: 'Unknown', color: '#777' }
  if (aqi <= 50) return { label: 'Good', color: '#34c759' }
  if (aqi <= 100) return { label: 'Moderate', color: '#ffcc00' }
  if (aqi <= 150) return { label: 'Sensitive', color: '#ff9500' }
  if (aqi <= 200) return { label: 'Unhealthy', color: '#ff3b30' }
  if (aqi <= 300) return { label: 'Very Unhealthy', color: '#af52de' }
  return { label: 'Hazardous', color: '#7f0000' }
}

/* ---------------- WIND ---------------- */
function WindArrow({ direction = 0, speed = 0 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: 0.85 }}>
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        style={{ transform: `rotate(${direction}deg)` }}
      >
        <line x1="12" y1="19" x2="12" y2="6" stroke="currentColor" strokeWidth="2.2" />
        <path d="M12 4 L7 9 L9 9 L12 6 L15 9 L17 9 Z" fill="currentColor" />
      </svg>
      <span style={{ fontSize: 16 }}>{Math.round(speed)} mph</span>
    </div>
  )
}

/* ---------------- STACK ---------------- */
const Stack = ({ gap = 0, children, style = {} }) => (
  <div style={{ display: 'flex', flexDirection: 'column',justifyContent: "space-evenly", gap, ...style }}>
    {children}
  </div>
)

/* ---------------- COMPONENT ---------------- */
export default function CurrentWeatherCard() {
  const [data, setData] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)

  useEffect(() => {
    const load = async () => {
      const res = await fetch(WEATHER_URL)
      const json = await res.json()
      setData(json)
      setLastUpdated(new Date())
    }

    load()
    const id = setInterval(load, 10 * 60 * 1000)
    return () => clearInterval(id)
  }, [])

  const weather = useMemo(() => {
    if (!data) return null

    const current = data.current ?? {}
    const hourly = data.hourly ?? {}
    const daily = data.daily ?? {}

    const temps = (hourly.temperature_2m ?? []).slice(0, 24)
    const rain = (hourly.precipitation_probability ?? []).slice(0, 24)
    const rainSum = (daily.rain_sum ?? []).slice(0, 24)
    const snow = (hourly.snowfall ?? []).slice(0, 24)
    const times = (hourly.time ?? []).slice(0, 24)

    const rainIndexes = rain
      .map((v, i) => (v >= 30 ? i : null))
      .filter(v => v !== null)

    const snowIndexes = snow
      .map((v, i) => (v > 0 ? i : null))
      .filter(v => v !== null)

    const snowTotal = snow.reduce((sum, v) => sum + (v ?? 0), 0)
    const rainTotal = rainSum.reduce((sum, v) => sum + (v ?? 0), 0)
    return {
      current,
      icon: getWeatherIcon(current.weathercode),

      high: temps.length ? Math.max(...temps) : null,
      low: temps.length ? Math.min(...temps) : null,

      rainStart: rainIndexes.length ? times[rainIndexes[0]] : null,
      rainEnd: rainIndexes.length ? times[rainIndexes.at(-1)] : null,
      rainTotal,

      snowStart: snowIndexes.length ? times[snowIndexes[0]] : null,
      snowEnd: snowIndexes.length ? times[snowIndexes.at(-1)] : null,
      snowTotal,

      sunrise: daily.sunrise?.[0] ?? null,
      sunset: daily.sunset?.[0] ?? null,

      moon: getMoonPhase(new Date()),

      aqi: current.us_aqi ?? null,
      aqiInfo: getAQI(current.us_aqi)
    }
  }, [data])

  const formatTime = (t) =>
    t ? new Date(t).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) : ''

  if (!weather) {
    return (
      <div style={{ background: '#1a1a1a', borderRadius: 16, padding: 22, opacity: 0.6 }}>
        Loading weather...
      </div>
    )
  }

  const {
    current,
    icon,
    high,
    low,
    rainStart,
    rainEnd,
    rainTotal,
    snowStart,
    snowEnd,
    snowTotal,
    sunrise,
    sunset,
    moon,
    aqi,
    aqiInfo
  } = weather

  const hasSnow = snowStart && snowEnd && snowTotal > 0

  return (
    <div
      style={{
        background: '#1a1a1a',
        borderRadius: 16,
        padding: 22,
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        gap: 40
      }}
    >

      {/* LEFT */}

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Stack>
            <div style={{ fontSize: 64, fontWeight: 700 }}>
              {Math.round(current.temperature_2m ?? 0)}°
            </div>
            <div style={{ fontSize: 20, opacity: 0.85 }}>
              Feels like {Math.round(current.apparent_temperature ?? 0)}°
            </div>
          </Stack>
          <div style={{ fontSize: 42 }}>{icon}</div>
        </div>

        <Stack style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{color:"#9f9fa1", fontWeight:"bolder"}}>Temperature</span>
          <span style={{fontSize:"30px", fontWeight:"bolder" }}>
            H {high != null ? Math.round(high) : '--'}° /
            L {low != null ? Math.round(low) : '--'}°
          </span>

          <WindArrow
            direction={current.wind_direction_10m}
            speed={current.wind_speed_10m}
          />
        </Stack>

        <Stack style={{ display: 'flex', alignItems: 'center', gap: 16 }} >
          <span style={{color: "#9f9fa1", fontWeight:"bolder"}}>Rainfall</span>
          <div style={{fontSize: "30px", fontWeight:"bolder"}}>
            { rainTotal> 0.00?  `${rainTotal} in`:null}
          </div>
          <div style={{fontSize:"18px"}}>
            {rainStart && rainEnd
              ? `${formatTime(rainStart)} → ${formatTime(rainEnd)}`
              : 'No rain expected'}
          </div>

          {hasSnow && (
            <div>
              Snow {formatTime(snowStart)} → {formatTime(snowEnd)}, ({snowTotal.toFixed(1)} in)
            </div>
          )}
        </Stack>

      {/* RIGHT */}
      <Stack gap={18} style={{ minWidth: 220, textAlign: 'right' }}>

        {/* SUN */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 22 }}>
          <div>
            <div style={{ fontSize: 14, opacity: 0.6 }}>Sunrise</div>
            <div style={{ fontSize: 20 }}>{formatTime(sunrise)}</div>
          </div>

          <div>
            <div style={{ fontSize: 14, opacity: 0.6 }}>Sunset</div>
            <div style={{ fontSize: 20 }}>{formatTime(sunset)}</div>
          </div>
        </div>

        {/* MOON */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, alignItems: 'center' }}>
          <span style={{ fontSize: 30 }}>{moon.icon}</span>
          <span style={{ fontSize: 20 }}>{moon.label}</span>
        </div>

        {/* AQI */}
        {aqi != null && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
            <div style={{ fontSize: 14, opacity: 0.6 }}>Air Quality</div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 999,
                  background: aqiInfo.color
                }}
              />
              <div style={{ fontSize: 18 }}>
                {aqi} • {aqiInfo.label}
              </div>
            </div>
          </div>
        )}

        {/* UPDATED */}
        <div style={{ fontSize: 14, opacity: 0.6 }}>
          Updated {lastUpdated ? formatTime(lastUpdated) : '--'}
        </div>

      </Stack>

    </div>
  )
}