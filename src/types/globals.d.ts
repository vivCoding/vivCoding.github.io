import { changeTheme } from "../settings"

declare global {
  interface Window {
    changeTheme: typeof changeTheme
  }
}

export {}
