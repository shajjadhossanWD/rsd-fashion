/**
 * Single source of truth for runtime configuration.
 * Never read `import.meta.env` directly elsewhere — import `env` from here.
 */
function required(key: keyof ImportMetaEnv, fallback?: string): string {
  const value = import.meta.env[key] ?? fallback
  if (value === undefined || value === '') {
    throw new Error(`Missing required environment variable: ${String(key)}`)
  }
  return String(value)
}

export const env = {
  appName: required('VITE_APP_NAME', 'RSD Fashion'),
  // Fallback matches .env.example, so a deploy without env vars (e.g. a fresh Vercel
  // project) still boots — this is read at startup, and a throw here blanks every page.
  apiBaseUrl: required('VITE_API_BASE_URL', 'https://fakestoreapi.com'),
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
} as const
