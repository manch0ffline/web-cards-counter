export const NumberOfWinsEnum = {
  plus: "plus",
  minus: "minus",
} as const;

export type NumberOfWinsEnum = (typeof NumberOfWinsEnum)[keyof typeof NumberOfWinsEnum];