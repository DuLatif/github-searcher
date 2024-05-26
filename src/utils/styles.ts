export const combineClasses = (
  classes: (CSSModuleClasses | string | boolean | undefined)[]
): string => {
  return classes.join(" ");
};
