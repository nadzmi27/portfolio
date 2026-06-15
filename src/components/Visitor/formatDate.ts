export const formatDate = (createdAt: string) => {
  const date = new Date(createdAt);
  return date.toLocaleString(undefined, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};
