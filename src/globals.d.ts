import { changeTheme } from "@/settings"
import { Alpine as AlpineType } from "alpinejs"

declare global {
  interface Window {
    Alpine: AlpineType
    changeTheme: typeof changeTheme
  }
}

export {}
