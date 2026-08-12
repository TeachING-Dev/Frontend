const SUBSCRIPTION_STATUS_KEY =
  "teachingSubscriptionActive";
const MEMBERSHIP_TYPE_KEY =
  "teachingMembershipType";
const DAILY_QUESTION_COUNT_KEY =
  "chatbotDailyQuestionCount";
const PREMIUM_MEMBERSHIP_TYPES = new Set([
  "PREMIUM",
  "PLUS",
  "TEACHING_PLUS",
  "TEACHINGPLUS",
]);

export const isPremiumMembership = (
  membershipType?: string | null,
) =>
  PREMIUM_MEMBERSHIP_TYPES.has(
    membershipType?.trim().toUpperCase() ?? "",
  );

export const saveMembershipType = (
  membershipType?: string | null,
) => {
  const normalizedMembershipType =
    membershipType?.trim().toUpperCase() ?? "";

  if (!normalizedMembershipType) {
    return;
  }

  localStorage.setItem(
    MEMBERSHIP_TYPE_KEY,
    normalizedMembershipType,
  );

  if (
    isPremiumMembership(normalizedMembershipType)
  ) {
    localStorage.setItem(
      SUBSCRIPTION_STATUS_KEY,
      "true",
    );
    localStorage.removeItem(
      DAILY_QUESTION_COUNT_KEY,
    );
    return;
  }

  localStorage.removeItem(SUBSCRIPTION_STATUS_KEY);
};

export const getStoredMembershipType = () =>
  localStorage.getItem(MEMBERSHIP_TYPE_KEY);

export const activateSubscription = (
  membershipType = "PREMIUM",
) => {
  saveMembershipType(membershipType);
  localStorage.setItem(
    SUBSCRIPTION_STATUS_KEY,
    "true",
  );
  localStorage.removeItem(DAILY_QUESTION_COUNT_KEY);
};

export const clearSubscriptionStatus = () => {
  localStorage.removeItem(SUBSCRIPTION_STATUS_KEY);
  localStorage.removeItem(MEMBERSHIP_TYPE_KEY);
  localStorage.removeItem(DAILY_QUESTION_COUNT_KEY);
};

export const isSubscriptionActive = () =>
  isPremiumMembership(getStoredMembershipType()) ||
  localStorage.getItem(SUBSCRIPTION_STATUS_KEY) ===
    "true";
