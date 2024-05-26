export const generateCacheKey = (
  basePath: string,
  params: Record<string, any>
): string => {
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");

  return queryString ? `${basePath}?${queryString}` : basePath;
};
