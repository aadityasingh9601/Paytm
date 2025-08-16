export function formatTransactionTime(
  timestamp: Date | string | number
): string {
  const date = new Date(timestamp);

  // Early validation
  if (!date.getTime()) return "Invalid date";

  const now = Date.now();
  const diffMs = now - date.getTime();

  // Handle future dates
  if (diffMs < 0) return "Just now";

  const minutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(diffMs / 3600000);

  // Under 1 minute
  if (minutes < 1) return "Just now";

  // 1-59 minutes
  if (minutes < 60) {
    return `${minutes} min${minutes === 1 ? "" : "s"} ago`;
  }

  // 1-23 hours
  if (hours < 24) {
    return `${hours} hr${hours === 1 ? "" : "s"} ago`;
  }

  // 24+ hours: Use date format
  const isCurrentYear = date.getFullYear() === new Date().getFullYear();

  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    ...(isCurrentYear ? {} : { year: "numeric" }),
  });
}
