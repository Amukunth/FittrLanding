export type WaitlistStats = {
  eligibleCount: number;
  bonusSpotsRemaining: number;
  bonusSpotsFilled: boolean;
  cap: number;
};

/** The five question screens. Welcome sits at index 0 and carries no rail. */
export const QUESTION_STEPS = ["email", "age", "name", "phone", "terms"] as const;

export type QuestionStep = (typeof QUESTION_STEPS)[number];

export const TOTAL_STEPS = QUESTION_STEPS.length;

/** Terminal states. `underage` ends the flow client-side with no row written. */
export type Outcome = "underage" | "success";

export type FlowData = {
  email: string;
  ageConfirmed: boolean | null;
  name: string;
  phone: string;
  termsAgreed: boolean;
};

export const EMPTY_FLOW: FlowData = {
  email: "",
  ageConfirmed: null,
  name: "",
  phone: "",
  termsAgreed: false,
};

export type SignupResult = {
  email: string;
  name: string | null;
  status: "eligible";
  referralCode: string;
  waitlistPosition: number | null;
  bonusEligible: boolean;
  referralCount: number;
};
