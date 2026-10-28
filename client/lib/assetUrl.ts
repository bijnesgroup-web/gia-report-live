/**
 * Resolve an image/logo field that may contain either a legacy filename or
 * an absolute Vercel Blob URL. Absolute URLs are used unchanged.
 */
export function getAssetUrl(
  value?: string | null,
  kind: "image" | "logo" = "image",
): string {
  if (!value) return "";
  const path = value.trim();
  if (!path) return "";
  if (/^https?:\/\//i.test(path) || path.startsWith("data:") || path.startsWith("blob:")) {
    return path;
  }

  const base = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/+$/, "");
  if (!base) return path;
  const cleanPath = path.replace(/^\/+/, "");
  const isLogoPath = kind === "logo" && !cleanPath.startsWith("logo/");
  return `${base}/uploads/${isLogoPath ? "logo/" : ""}${cleanPath}`;
}
