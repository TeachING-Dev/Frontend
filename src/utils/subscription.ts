const SUBSCRIPTION_STATUS_KEY =
  "teachingSubscriptionActive";
const DAILY_QUESTION_COUNT_KEY =
  "chatbotDailyQuestionCount";
const PREMIUM_MEMBERSHIP_TYPES = new Set([
  "PREMIUM",
  "PLUS",
  "TEACHING_PLUS",
  "TEACHINGPLUS",
]);

export const activateSubscription = () => {
  localStorage.setItem(
    SUBSCRIPTION_STATUS_KEY,
    "true",
  );
  localStorage.removeItem(DAILY_QUESTION_COUNT_KEY);
};

export const isSubscriptionActive = () =>
  localStorage.getItem(SUBSCRIPTION_STATUS_KEY) ===
  "true";

export const isPremiumMembership = (
  membershipType?: string | null,
) =>
  PREMIUM_MEMBERSHIP_TYPES.has(
    membershipType?.trim().toUpperCase() ?? "",
  );
