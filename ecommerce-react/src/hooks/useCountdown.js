import { useEffect, useMemo, useState } from 'react';

function pad(n) {
  return String(Math.max(0, n)).padStart(2, '0');
}

/**
 * Returns { totalMs, hrs, mins, secs, label } ticking down toward endDate.
 */
export function useCountdown(endDate) {
  const target = useMemo(() => endDate.getTime(), [endDate]);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const totalMs = Math.max(0, target - now);
  const totalSec = Math.floor(totalMs / 1000);
  const hrs = Math.floor(totalSec / 3600);
  const mins = Math.floor((totalSec % 3600) / 60);
  const secs = totalSec % 60;

  return {
    totalMs,
    hrs,
    mins,
    secs,
    label: `${pad(hrs)}:${pad(mins)}:${pad(secs)}`,
  };
}
