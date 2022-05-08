export const compareDate = (left: Date | null, right: Date | null): number => {
  if (left && right) {
    return left.getTime() - right.getTime();
  } else if (left) {
    return 1;
  } else if (right) {
    return -1;
  } else {
    return 0;
  }
};
