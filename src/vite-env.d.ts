/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_KAKAO_MAP_API_KEY: string;
  readonly VITE_API_HOST: string;
  readonly VITE_API_ERROR_HELPER_HOST: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
