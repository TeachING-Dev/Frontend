const SUBSCRIPTION_STATUS_KEY =
  "teachingSubscriptionActive";
const DAILY_QUESTION_COUNT_KEY =
  "chatbotDailyQuestionCount";

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
