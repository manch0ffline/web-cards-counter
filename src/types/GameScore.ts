export const GameScore = {
  "plus-10": 10,
  "plus-15": 15,
  "plus-20": 20,
  "minus-20": -20,
} as const;

export type GameScore = (typeof GameScore)[keyof typeof GameScore];
