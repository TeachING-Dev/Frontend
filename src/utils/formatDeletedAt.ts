const ONE_HOUR_IN_MILLISECONDS =
  60 * 60 * 1000;
const ONE_DAY_IN_MILLISECONDS =
  24 * ONE_HOUR_IN_MILLISECONDS;

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(
    date.getMonth() + 1,
  ).padStart(2, "0");
  const day = String(
    date.getDate(),
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const formatDeletedAt = (
  deletedAt: string,
  now = new Date(),
) => {
  const deletedDate = new Date(deletedAt);

  if (
    Number.isNaN(deletedDate.getTime())
  ) {
    return deletedAt;
  }

  const elapsedTime =
    now.getTime() - deletedDate.getTime();

  if (
    elapsedTime >= 0 &&
    elapsedTime < ONE_DAY_IN_MILLISECONDS
  ) {
    const elapsedHours = Math.max(
      1,
      Math.floor(
        elapsedTime /
          ONE_HOUR_IN_MILLISECONDS,
      ),
    );

    return `${elapsedHours}시간 전`;
  }

  return formatDate(deletedDate);
};

export default formatDeletedAt;
