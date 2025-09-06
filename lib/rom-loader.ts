/**
 * ROM Loader Utility
 * Handles loading and validation of ROM files from various sources
 */

export interface ROMMetadata {
  name: string
  console: string
  size: number
  checksum?: string
  region?: string
}

export class ROMLoader {
  private static readonly SUPPORTED_EXTENSIONS = [
    ".smc",
    ".sfc", // SNES
    ".z64",
    ".n64",
    ".v64", // N64
    ".bin",
    ".cue",
    ".iso", // PS1
    ".iso", // PS2
    ".iso",
    ".xex", // Xbox 360
  ]

  /**
   * Load ROM from URL with CORS support
   */
  static async loadROM(url: string): Promise<ArrayBuffer> {
    try {
      const response = await fetch(url, {
        mode: "cors",
        headers: {
          Accept: "application/octet-stream",
          "Cache-Control": "no-cache",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const contentLength = response.headers.get("content-length")
      if (contentLength && Number.parseInt(contentLength) === 0) {
        throw new Error("ROM file is empty")
      }

      return await response.arrayBuffer()
    } catch (error) {
      console.error("[ROM Loader] Failed to load ROM:", error)
      throw new Error(`Failed to load ROM: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  /**
   * Validate ROM file format
   */
  static validateROM(filename: string, data: ArrayBuffer): boolean {
    const extension = filename.toLowerCase().substring(filename.lastIndexOf("."))

    if (!this.SUPPORTED_EXTENSIONS.includes(extension)) {
      throw new Error(`Unsupported ROM format: ${extension}`)
    }

    if (data.byteLength === 0) {
      throw new Error("ROM file is empty")
    }

    // Basic size validation (minimum 32KB for most ROMs)
    if (data.byteLength < 32 * 1024) {
      throw new Error("ROM file appears to be too small")
    }

    return true
  }

  /**
   * Extract ROM metadata
   */
  static extractMetadata(filename: string, data: ArrayBuffer): ROMMetadata {
    const extension = filename.toLowerCase().substring(filename.lastIndexOf("."))
    let console = "Unknown"

    // Determine console from extension
    if ([".smc", ".sfc"].includes(extension)) {
      console = "SNES"
    } else if ([".z64", ".n64", ".v64"].includes(extension)) {
      console = "N64"
    } else if (extension === ".bin" || extension === ".cue" || extension === ".iso") {
      console = "PS1" // Could also be PS2, would need deeper analysis
    }

    return {
      name: filename.replace(/\.[^/.]+$/, ""), // Remove extension
      console,
      size: data.byteLength,
      region: this.detectRegion(filename),
    }
  }

  /**
   * Detect ROM region from filename
   */
  private static detectRegion(filename: string): string {
    const upperFilename = filename.toUpperCase()

    if (upperFilename.includes("(USA)") || upperFilename.includes("(US)")) {
      return "NTSC-U"
    } else if (upperFilename.includes("(EUROPE)") || upperFilename.includes("(EUR)")) {
      return "PAL"
    } else if (upperFilename.includes("(JAPAN)") || upperFilename.includes("(JPN)")) {
      return "NTSC-J"
    }

    return "Unknown"
  }

  /**
   * Generate Internet Archive URLs for common ROM collections
   */
  static generateArchiveURL(console: string, romName: string): string {
    const baseURL = "https://archive.org/download/"
    const collections: Record<string, string> = {
      SNES: "No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Super%20Nintendo%20Entertainment%20System/",
      N64: "No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Nintendo%2064/",
      PS1: "No-Intro-Collection_2016-01-03_Fixed/Sony%20-%20PlayStation/",
      PS2: "chd_psx2/",
      "Xbox 360": "RGH_Xbox_360_Games/",
    }

    const collection = collections[console]
    if (!collection) {
      throw new Error(`No archive collection found for console: ${console}`)
    }

    // URL encode the ROM name
    const encodedRomName = encodeURIComponent(romName)

    return `${baseURL}${collection}${encodedRomName}`
  }
}

/**
 * ROM URL Generator for Internet Archive
 */
export const ROM_URLS = {
  SNES: {
    base: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Super%20Nintendo%20Entertainment%20System/",
    examples: [
      "Chrono%20Trigger%20%28USA%29.zip",
      "Super%20Mario%20World%20%28USA%29.zip",
      "The%20Legend%20of%20Zelda%20-%20A%20Link%20to%20the%20Past%20%28USA%29.zip",
    ],
  },
  N64: {
    base: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Nintendo%20-%20Nintendo%2064/",
    examples: [
      "Super%20Mario%2064%20%28USA%29.z64",
      "The%20Legend%20of%20Zelda%20-%20Ocarina%20of%20Time%20%28USA%29%20%28Rev%20B%29.z64",
      "Super%20Smash%20Bros.%20%28USA%29.z64",
    ],
  },
  PS1: {
    base: "https://archive.org/download/No-Intro-Collection_2016-01-03_Fixed/Sony%20-%20PlayStation/",
    examples: [
      "Final%20Fantasy%20VII%20%28USA%29%20%28Disc%201%29.bin",
      "Metal%20Gear%20Solid%20%28USA%29%20%28Disc%201%29.bin",
      "Crash%20Bandicoot%20%28USA%29.bin",
    ],
  },
} as const
