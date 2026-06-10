import { useEffect, useMemo, useState } from 'react'
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine
} from 'recharts'

const WEATHER_URL =
'https://api.open-meteo.com/v1/forecast?latitude=47.04&longitude=-122.90&hourly=temperature_2m,precipitation_probability&timezone=auto&temperature_unit=fahrenheit'

export default function HourlyTimeline() {
  const [data, setData] = useState(null)

  useEffect(() => {
    const load = async () => {
      const res = await fetch(WEATHER_URL)
      const json = await res.json()
      setData(json)
    }

    load()
    const id = setInterval(load, 15 * 60 * 1000)
    return () => clearInterval(id)
  }, [])

  const chartData = useMemo(() => {
    if (!data?.hourly) return []

    return data.hourly.time.slice(0, 24).map((time, i) => ({
      time,
      hour: new Date(time).toLocaleTimeString([], { hour: 'numeric' }),
      temp: Math.round(data.hourly.temperature_2m[i]),
      rain: data.hourly.precipitation_probability[i]
    }))
  }, [data])

  if (!chartData.length) {
    return (
      <div style={{ background: '#1a1a1a', borderRadius: 12, padding: 16, height: 260 }}>
        Loading hourly forecast...
      </div>
    )
  }

  /* ---------------- CURRENT HOUR MARKER ---------------- */
  const nowHour = new Date().getHours()

  const currentIndex = chartData.findIndex(d => {
    return new Date(d.time).getHours() === nowHour
  })

  /* ---------------- TEMP PEAK / VALLEY LABELS ---------------- */
  const highTemp = Math.max(...chartData.map(d => d.temp))
  const lowTemp = Math.min(...chartData.map(d => d.temp))

  const SmartTempLabel = ({ x, y, value, index }) => {
    const isHigh = value === highTemp
    const isLow = value === lowTemp

    if (!isHigh && !isLow) return null

    return (
      <text
        x={x}
        y={isHigh ?  y + 14:y - 10}
        textAnchor="middle"
        fontSize={10}
        fill="#ffffff"
        opacity={0.9}
      >
        {value}°
      </text>
    )
  }

  /* ---------------- RAIN PEAK / VALLEY ---------------- */
  const RainLabel = ({ x, y, value, index }) => {
    const prev = chartData[index - 1]?.rain
    const next = chartData[index + 1]?.rain

    if (prev == null || next == null) return null

    const isPeak = value > prev && value > next
    const isValley = value < prev && value < next

    if (!isPeak && !isValley) return null

    return (
      <text
        x={x}
        y={isPeak ? y - 10 : y + 14}
        textAnchor="middle"
        fontSize={10}
        fill="#4fc3f7"
        opacity={0.9}
      >
        {value}%
      </text>
    )
  }

  return (
    <div style={{ background: '#1a1a1a', borderRadius: 12, padding: 24 }}>
      <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 12 }}>
        NEXT 24 HOURS
      </div>

      <div style={{ width: '100%', height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData}>
            <CartesianGrid stroke="#333" strokeDasharray="3 3" />

            <XAxis dataKey="hour" />
            <YAxis yAxisId="temp" orientation="left" unit="°" />
            <YAxis yAxisId="rain" orientation="right" domain={[0, 100]} unit="%" />

            <Tooltip />

            {/* 🌧️ Rain background */}
            <Area
              yAxisId="rain"
              type="monotone"
              dataKey="rain"
              fill="#4fc3f7"
              stroke="#4fc3f7"
              fillOpacity={0.25}
            />

            {/* Rain labels */}
            <Line
              yAxisId="rain"
              type="monotone"
              dataKey="rain"
              stroke="transparent"
              dot={false}
              label={RainLabel}
            />

            {/* Temp line */}
            <Line
              yAxisId="temp"
              type="monotone"
              dataKey="temp"
              stroke="#ff9800"
              strokeWidth={3}
              dot={{ r: 3 }}
              label={SmartTempLabel}
            />

            {/* 🟦 CURRENT HOUR MARKER */}
            {currentIndex !== -1 && (
              <ReferenceLine
                x={chartData[currentIndex].hour}
                stroke="#ffffff"
                strokeOpacity={1}
                strokeDasharray="3 3"
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}