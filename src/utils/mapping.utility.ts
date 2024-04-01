type maybe = undefined | null;

export const conditionalMapping = <T>(arg: T | undefined): T | undefined => {
  if (arg === undefined || arg == null) return undefined;
  return arg;
};
