type Return<T> = [T[], number, number];

export const deduplicate = <T extends object>(
  array: T[],
  compareKey: keyof T,
): Return<T> => {
  const deduplicated = array.filter(
    (item, index) =>
      array.findIndex((compare) => compare[compareKey] === item[compareKey]) ===
      index,
  );

  const originalLength = array.length;
  const shift = array.length - deduplicated.length;

  return [deduplicated, originalLength, shift];
};
