import cloneDeep from "lodash/cloneDeep";
import calculateScore from "../calculate-score";

describe("calculateScore()", () => {
  const members = [
    { name: "John", scores: { Kate: 7, Ellie: 8, Zack: 4 } },
    { name: "Kate", scores: { John: 4, Ellie: 10, Zack: 3 } },
    { name: "Ellie", scores: { John: 5, Kate: 6, Zack: 2 } },
    { name: "Zack", scores: { John: 6, Kate: 5, Ellie: 8 } }
  ];

  it.each`
    member     | expectedAvgScore | expectedFinalScore
    ${"John"}  | ${5}             | ${24}
    ${"Kate"}  | ${6}             | ${23}
    ${"Ellie"} | ${9}             | ${22}
    ${"Zack"}  | ${3}             | ${22}
  `(
    "should calculate correct scores",
    ({ member, expectedAvgScore, expectedFinalScore }) => {
      const quizMember = members.find(({ name }) => name === member)!;
      const score = calculateScore(quizMember, members);
      expect(score).toStrictEqual({
        avgRoundScore: expectedAvgScore,
        finalScore: expectedFinalScore
      });
    }
  );

  describe("null checks", () => {
    it("should raise error if member scores not present", () => {
      expect(() => calculateScore({ name: "John" }, members)).toThrow(
        "John has no scores"
      );
    });

    it("should raise error if member is missing a round score", () => {
      expect(() =>
        calculateScore(
          { name: "John", scores: { Kate: undefined, Ellie: 8, Zack: 4 } },
          members
        )
      ).toThrow("John has no score for Kate");
    });

    it("should raise error is other members are missing scores", () => {
      const corruptMembers = cloneDeep(members);
      delete corruptMembers[2].scores;
      expect(() => calculateScore(corruptMembers[0], corruptMembers)).toThrow(
        "Ellie has no scores"
      );
    });

    it("should raise error if other member is missing target round", () => {
      const corruptMembers = cloneDeep(members);
      corruptMembers[2].scores.John = undefined;
      expect(() => calculateScore(corruptMembers[0], corruptMembers)).toThrow(
        "Ellie has no score for John"
      );
    });
  });
});
