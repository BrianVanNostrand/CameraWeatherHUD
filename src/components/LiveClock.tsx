import { Badge, Box} from "@mantine/core";
import { useEffect, useState, type CSSProperties } from "react";

export default function LiveClock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const day = now.toLocaleDateString("en-US", { weekday: "long" });
  const date = now.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const styles: Record<string, CSSProperties> = {
    container: {
    
      fontFamily: "system-ui, sans-serif",
      textAlign: "center",
      padding: "20px",
      display: "grid"
    },
    day: {
      fontSize: "24px",
      fontWeight: 600,
    },
    date: {
      fontSize: "18px",
      marginTop: "4px",
      opacity: 0.8,
    },
    time: {width: "900px",
      fontSize: "100px",
      marginTop: "0px",
      fontVariantNumeric: "tabular-nums",
    },
  };
  const hour = new Date().getHours()
  const updatesEnabled = hour >= 7 
  return (
    <div style={styles.container}>
            <div style={styles.day}>{day}</div>
            <div style={styles.date}>{date}</div>
            <div style={styles.time}>{time}</div>
            <div>
            <Box>
              <Badge
                  color={updatesEnabled ? 'green' : 'gray'}
                  variant="filled"
                >
                  {updatesEnabled ? 'UPDATING' : 'PAUSED'}
              </Badge>
            </Box>
            </div>

    </div>
  );
}