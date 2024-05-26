export const combineClasses = (
  classes: (CSSModuleClasses | string | boolean | undefined)[]
): string => {
  const filteredClasses = classes.filter(Boolean);
  return filteredClasses.join(" ");
};
