export const calculateTotalPages = (
  totalItems: number,
  itemsPerPage: number
): number => {
  if (itemsPerPage <= 0) {
    throw new Error("itemsPerPage must be greater than 0");
  }

  return Math.ceil(totalItems / itemsPerPage);
};
