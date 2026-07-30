export type WaitlistStats = {
  eligibleCount: number;
  bonusSpotsRemaining: number;
  bonusSpotsFilled: boolean;
  cap: number;
};

/** The seven question screens. Welcome sits at index 0 and carries no rail. */
export const QUESTION_STEPS = [
  "email",
  "age",
  "state",
  "name",
  "interests",
  "source",
  "terms",
] as const;

export type QuestionStep = (typeof QUESTION_STEPS)[number];

export const TOTAL_STEPS = QUESTION_STEPS.length;

/**
 * Terminal states. `underage` and `restricted` end the flow; only `restricted`
 * still writes a row, because that visitor asked to be told when their state
 * opens up.
 */
export type Outcome = "underage" | "restricted" | "success";

export type FlowData = {
  email: string;
  ageConfirmed: boolean | null;
  state: string;
  name: string;
  interests: string[];
  source: string;
  termsAgreed: boolean;
};

export const EMPTY_FLOW: FlowData = {
  email: "",
  ageConfirmed: null,
  state: "",
  name: "",
  interests: [],
  source: "",
  termsAgreed: false,
};

export type SignupResult = {
  email: string;
  name: string | null;
  status: "eligible" | "restricted_state";
  state: string | null;
  referralCode: string;
  waitlistPosition: number | null;
  bonusEligible: boolean;
  referralCount: number;
};
