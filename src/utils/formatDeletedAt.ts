const ONE_MINUTE_IN_MILLISECONDS =
  60 * 1000;

const ONE_HOUR_IN_MILLISECONDS =
  60 * ONE_MINUTE_IN_MILLISECONDS;

const ONE_DAY_IN_MILLISECONDS =
  24 * ONE_HOUR_IN_MILLISECONDS;

const formatDeletedAt = (
  deletedAt: string,
  now = new Date(),
) => {
  // 백엔드 시간이 UTC인데 Z 없이 오는 경우 UTC로 처리
  const utcDeletedAt =
    deletedAt.endsWith("Z")
      ? deletedAt
      : `${deletedAt}Z`;

  const deletedDate = new Date(utcDeletedAt);

  if (
    Number.isNaN(deletedDate.getTime())
  ) {
    return deletedAt;
  }

  const elapsedTime =
    now.getTime() - deletedDate.getTime();

  if (elapsedTime < 0) {
    return "방금 전";
  }

  const elapsedMinutes = Math.floor(
    elapsedTime /
      ONE_MINUTE_IN_MILLISECONDS,
  );

  const elapsedHours = Math.floor(
    elapsedTime /
      ONE_HOUR_IN_MILLISECONDS,
  );

  const elapsedDays = Math.floor(
    elapsedTime /
      ONE_DAY_IN_MILLISECONDS,
  );

  if (elapsedMinutes < 1) {
    return "방금 전";
  }

  if (elapsedHours < 1) {
    return `${elapsedMinutes}분 전`;
  }

  if (elapsedHours < 24) {
    return `${elapsedHours}시간 전`;
  }

  return `${elapsedDays}일 전`;
};

export default formatDeletedAt;