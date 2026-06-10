import { Stack } from '@mantine/core'
import CurrentWeatherCard from './CurrentWeatherCard'
import HourlyTimeline from './HourlyTimeline'
import DailyForecast from './DailyForecast'

export default function WeatherPanel() {
  return (
    <Stack gap="md">
      <CurrentWeatherCard />
      <HourlyTimeline />
      <DailyForecast />
    </Stack>
  )
}