"use client";

import { useEffect, useState } from "react";
import getTime from "@/components/date/getTime";

function Clock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const serverTime = await getTime();
      setTime(serverTime);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return <>{time}</>;
}

export default Clock;
