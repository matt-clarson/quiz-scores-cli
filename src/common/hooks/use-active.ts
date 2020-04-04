import { useState } from "react";
import { useInput } from "ink";

function useActive<T>(data: T[]): number {
  const [active, setActive] = useState(0);
  useInput((_, key) => {
    if (key.downArrow) setActive(Math.min(active + 1, data.length - 1));
    else if (key.upArrow) setActive(Math.max(0, active - 1));
  });
  return active;
}

export default useActive;
