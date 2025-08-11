// Get full image URL
export const getImageUrl = (imageUrl: string): string => {
  // If the URL already includes the domain, return as is
  if (imageUrl?.startsWith("http")) {
    return imageUrl;
  }
  // Otherwise, assume it's a relative path and construct the URL
  return `${process.env.NEXT_PUBLIC_API_URL}/image/${imageUrl}`;
};
