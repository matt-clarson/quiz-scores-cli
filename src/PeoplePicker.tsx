import React from "react";
import { Select } from "./common/components/Select";
import { usePages } from "./common/components/Pages";
import { useQuiz } from "./Quiz";

type PeoplePickerProps = {
  people: string[];
};

const PeoplePicker: React.FC<PeoplePickerProps> = ({ people }) => {
  const { setPage } = usePages();
  const { setMembers } = useQuiz();
  const promptConfirmation = (people: string[]) => {
    setPage("confirmation", {
      acceptFn: () => {
        setMembers(people);
        setPage("scores");
      },
      cancelFn: () => setPage("people-picker"),
      message: `You have selected: ${people.join(", ")}`
    });
  };
  return (
    <Select
      label="Select quiz members"
      data={people}
      onSelect={promptConfirmation}
    />
  );
};

export default PeoplePicker;
