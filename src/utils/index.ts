const isNumeric = (value: unknown): boolean => {
  if (typeof value != "string") return false;
  else return /^-?\d+$/.test(value);
};

export default isNumeric;
