
interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_OTHER_KEY?: string
  readonly BASE_URL: string
  readonly MODE: 'development' | 'production' | 'test'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
