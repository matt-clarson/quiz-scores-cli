import React, { useState } from "react";
import { Box, useInput } from "ink";
import Checkbox from "./Checkbox";

type SelectProps = {
  label: string;
  data: string[];
  onSelect: (selected: string[]) => void;
};

const Select: React.FC<SelectProps> = ({ label, data, onSelect }) => {
  const [selected, setSelected] = useState(0);
  const [active, setActive] = useState(0);

  useInput((input, key) => {
    if (key.downArrow) setActive(Math.min(active + 1, data.length - 1));
    else if (key.upArrow) setActive(Math.max(0, active - 1));
    else if (input === " ") setSelected(selected ^ (2 ** active));
    else if (key.return) onSelect(data.filter((_, i) => selected & (2 ** i)));
  });

  return (
    <Box width={40} flexDirection="column">
      <Box>{label}</Box>
      <Box textWrap="wrap">
        {
          "(Use Space, Up, and Down to select options, and press Enter to submit)"
        }
      </Box>

      {data.map((datum, index) => (
        <Checkbox
          key={datum}
          value={datum}
          selected={!!(selected & (2 ** index))}
          active={active === index}
        />
      ))}
    </Box>
  );
};

export default Select;
