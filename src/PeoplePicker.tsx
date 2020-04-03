import React from "react";
import { Select } from "./common/components/Select";

type PeoplePickerProps = {
  people: string[];
};

const PeoplePicker: React.FC<PeoplePickerProps> = ({ people }) => {
  return (
    <Select
      label="Select quiz members"
      data={people}
      onSelect={console.log.bind(console)}
    />
  );
};

export default PeoplePicker;
