import { useEffect, useState } from 'react'

interface RadarInfo {
  name: string
  url: string
}

export default function RadarPanel( {name,url} : RadarInfo) {
  const [version, setVersion] = useState(0)
  useEffect(() => {
    const id = setInterval(() => {
      setVersion(v => v + 1)
    }, 10 * 60 * 1000)

    return () => clearInterval(id)
  }, [])

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        borderRadius: 12,
        overflow: 'hidden',
        background: '#111'
      }}
    >
      <img
        key={version}
        src={url}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          borderRadius: 12,
          opacity: 1
        }}
      />
      <span>
        {name}
      </span>
    </div>
  )
}