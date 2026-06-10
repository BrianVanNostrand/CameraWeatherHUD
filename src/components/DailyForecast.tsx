import { useEffect, useState } from 'react'
import { getMoonPhase } from '../utils/moonphase'
import { Stack } from '@mantine/core'

const WEATHER_URL =
'https://api.open-meteo.com/v1/forecast?latitude=47.04&longitude=-122.90&hourly=temperature_2m,precipitation_probability&daily=snowfall_sum,sunrise,sunset,weathercode,temperature_2m_max,temperature_2m_min&timezone=auto&temperature_unit=fahrenheit&precipitation_unit=inch&models=gfs_seamless'

/* ---------------- ICONS ---------------- */
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

/* ---------------- RAIN WINDOW ---------------- */
function getRainWindow(hourly, day) {
  const threshold = 30
  const times = hourly.time ?? []
  const rain = hourly.precipitation_probability ?? []

  let start = null
  let end = null

  for (let i = 0; i < times.length; i++) {
    if (!times[i].startsWith(day)) continue
    if (rain[i] >= threshold) {
      if (start === null) start = i
      end = i
    }
  }

  if (start === null || end === null) return null

  return {
    start: times[start],
    end: times[end]
  }
}

/* ---------------- SMALL HELPERS ---------------- */
const formatTime = (t) =>
  t
    ? new Date(t).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
    : ''

function MetaRow({ children }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 14,
        alignItems: 'center',
        fontSize: 13,
        opacity: 0.65,
        flexWrap: 'wrap'
      }}
    >
      {children}
    </div>
  )
}

/* ---------------- COMPONENT ---------------- */
export default function DailyForecast() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const load = async () => {
      const res = await fetch(WEATHER_URL)
      setData(await res.json())
    }

    load()
    const id = setInterval(load, 30 * 60 * 1000)
    return () => clearInterval(id)
  }, [])

  const daily = data?.daily
  const hourly = data?.hourly

  if (!daily || !hourly) {
    return (
      <div style={{ background: '#1a1a1a', borderRadius: 12, padding: 12, opacity: 0.6 }}>
        Loading 7 day forecast...
      </div>
    )
  }

  const moon = getMoonPhase(new Date())

  return (
    <div
      style={{
        background: '#1a1a1a',
        borderRadius: 12,
        padding: 12,
        display: 'flex',
        flexDirection: 'column',
        gap: 10
      }}
    >
      <div style={{ fontSize: 12, opacity: 0.6 }}>7 DAY OUTLOOK</div>

      {daily.time.slice(0, 7).map((day, i) => {
        const code = daily.weathercode?.[i]
        const icon = getWeatherIcon(code)

        const pop = daily.precipitation_probability_max?.[i]
        const rainWindow = getRainWindow(hourly, day)
        const snowsum = daily.snowfall_sum?.[i]
        const sunrise = daily.sunrise?.[i]
        const sunset = daily.sunset?.[i]

        return (
          <div
            key={day}
            style={{
              fontSize: "25px",
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 12px',
              background: '#222',
              borderRadius: 10,
              gap: 16
            }}
          >
            {/* LEFT */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ fontSize: 20 }}>{icon}</div>
            <div style={{ fontSize: 25 }}>
              {new Date(day).toLocaleDateString(undefined, { weekday: 'short' })}
            </div>
            {/* Converted to a strict boolean to avoid rendering an accidental '0' */}
              {Boolean(snowsum) && (
                <div>
                  {`❄️ - ${snowsum} in`}
                </div>
              )}
            </div>

            {/* RIGHT MAIN TEMP */}
            <div style={{ fontWeight: "BOLDER" }}>
             H {Math.round(daily.temperature_2m_max[i])}° 
             L {Math.round(daily.temperature_2m_min[i])}°
            </div>

            {/* METADATA ROW (LEFT → RIGHT FLOW) */}
            <MetaRow>
              <Stack>
              <span>🌙 {moon.label}</span>
                {pop != null && <span>🌧️ {pop}%</span>}

                {rainWindow && (
                  <span>
                    ☔ {formatTime(rainWindow.start)} → {formatTime(rainWindow.end)}
                  </span>
                )}
              </Stack>
              <Stack>
              {sunrise && <span>🌅 {formatTime(sunrise)}</span>}
              {sunset && <span>🌇 {formatTime(sunset)}</span>}
              </Stack>
            </MetaRow>
          </div>
        )
      })}
    </div>
  )
}