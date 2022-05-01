const isNumeric = (value: unknown): boolean => {
  if (typeof value != "string") return false;
  return /^-?\d+$/.test(value);
};

export default isNumeric;
