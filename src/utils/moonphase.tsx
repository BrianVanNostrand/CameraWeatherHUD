export function getMoonPhase(date = new Date()) {
    const synodicMonth = 29.530588853
  
    const knownNewMoon = new Date(Date.UTC(2000, 0, 6, 18, 14, 0))
  
    const diff = date.getTime() - knownNewMoon.getTime()
    const days = diff / 86400000
  
    const phase =
      ((days % synodicMonth) + synodicMonth) %
      synodicMonth /
      synodicMonth
  
    if (phase < 0.03 || phase > 0.97)
      return { icon: '🌑', label: 'New Moon', phase }
  
    if (phase < 0.22)
      return { icon: '🌒', label: 'Waxing Crescent', phase }
  
    if (phase < 0.28)
      return { icon: '🌓', label: 'First Quarter', phase }
  
    if (phase < 0.47)
      return { icon: '🌔', label: 'Waxing Gibbous', phase }
  
    if (phase < 0.53)
      return { icon: '🌕', label: 'Full Moon', phase }
  
    if (phase < 0.72)
      return { icon: '🌖', label: 'Waning Gibbous', phase }
  
    if (phase < 0.78)
      return { icon: '🌗', label: 'Last Quarter', phase }
  
    return { icon: '🌘', label: 'Waning Crescent', phase }
  }