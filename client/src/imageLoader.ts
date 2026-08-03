/**
 * Image loader utility for Voyage UAE.
 * Handles fallback loading for images when running locally or on platforms without manus-storage.
 */

export function getImageUrl(manusStoragePath: string, fallbackColor: string = "#f6f1e7"): string {
  // In production on Manus, use the manus-storage URL directly
  if (typeof window !== "undefined" && window.location.hostname.includes("manus")) {
    return manusStoragePath;
  }

  // For local development, create a data URL placeholder
  // This ensures images don't break when running locally
  const isLogo = manusStoragePath.includes("logo");
  const isHero = manusStoragePath.includes("hero-placeholder");

  if (isLogo) {
    // Return a simple SVG logo as fallback
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect x='20' y='20' width='30' height='30' fill='%23064e3b'/%3E%3Crect x='55' y='35' width='25' height='25' fill='%23064e3b'/%3E%3Crect x='30' y='55' width='25' height='25' fill='%23f8e7c9'/%3E%3Ccircle cx='70' cy='70' r='12' fill='%23f8e7c9'/%3E%3C/svg%3E`;
  }

  if (isHero) {
    // Return a gradient placeholder for hero images
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 600'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23064e3b;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23f8e7c9;stop-opacity:0.3' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1200' height='600' fill='url(%23grad)'/%3E%3Cpolygon points='0,200 400,0 400,400' fill='%23f8e7c9' opacity='0.2'/%3E%3Cpolygon points='800,600 1200,300 1200,600' fill='%23f8e7c9' opacity='0.15'/%3E%3C/svg%3E`;
  }

  // Default placeholder for landmark cards
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 330'%3E%3Crect width='400' height='330' fill='%23e9dfcd'/%3E%3Crect x='0' y='0' width='400' height='220' fill='%2360736b'/%3E%3Crect x='50' y='100' width='100' height='100' fill='%23f8e7c9' opacity='0.4'/%3E%3Crect x='250' y='80' width='120' height='120' fill='%23f8e7c9' opacity='0.3'/%3E%3C/svg%3E`;
}
