export default function HourlyPrecipitationStrip({
    values
  }: {
    values: number[]
  }) {
    if (!values || values.length === 0) {
      return (
        <div
          style={{
            height: 18,
            marginTop: 6,
            borderRadius: 4,
            background: 'rgba(0,0,0,0.06)'
          }}
        />
      )
    }
  
    const labels = [
      '12a', '', '', '3a', '', '', '6a', '', '',
      '9a', '', '', '12p', '', '', '3p', '', '',
      '6p', '', '', '9p', '', ''
    ]
  
    return (
      <div style={{ marginTop: 6, width: '100%' }}>
  
        {/* BARS */}
        <div
          style={{
            display: 'flex',
            height: 6,
            borderRadius: 4,
            overflow: 'hidden',
            width: '100%'
          }}
        >
          {values.slice(0, 24).map((v, i) => {
            const intensity = Math.max(0, Math.min(1, v / 100))
  
            return (
              <div
                key={i}
                style={{
                  width: `${100 / 24}%`,
                  height: '100%',
                  backgroundColor: `rgba(80,160,255,${intensity})`,
                  flexShrink: 0
                }}
              />
            )
          })}
        </div>
  
        {/* X-AXIS LABELS */}
        <div
          style={{
            display: 'flex',
            width: '100%',
            marginTop: 2,
            fontSize: 9,
            color: 'rgba(0,0,0,0.6)'
          }}
        >
          {labels.map((label, i) => (
            <div
              key={i}
              style={{
                width: `${100 / 24}%`,
                textAlign: 'center'
              }}
            >
              {label}
            </div>
          ))}
        </div>
  
      </div>
    )
  }