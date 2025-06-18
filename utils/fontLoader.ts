// Font preloader utility
export class FontLoader {
  private static loadedFonts = new Set<string>();

  static async preloadFont(url: string): Promise<boolean> {
    if (this.loadedFonts.has(url)) {
      return true;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch font: ${response.status}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      // Basic validation - check if it's a valid font file
      if (arrayBuffer.byteLength < 100) {
        throw new Error("Invalid font file size");
      }

      this.loadedFonts.add(url);
      return true;
    } catch (error) {
      console.warn(`Failed to preload font ${url}:`, error);
      return false;
    }
  }
  static getFallbackFont(): string {
    // Use local JSON font for better R3F compatibility
    return "/fonts/helvetiker_regular.typeface.json";
  }

  static getLocalFont(): string {
    // WOFF is better supported than WOFF2 in R3F
    return "/fonts/Inter-Bold.woff";
  }

  static getSystemFont(): string {
    // Local bold JSON font for R3F
    return "/fonts/helvetiker_bold.typeface.json";
  }
}
