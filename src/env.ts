interface Env {
  kakao: {
    mapApiKey: string;
  };
  api: {
    host: string;
    errorHelper: string;
  };
}

export const env: Env = {
  kakao: {
    mapApiKey: import.meta.env.VITE_APP_KAKAO_MAP_API_KEY?.toString() || 'error',
  },
  api: {
    host: import.meta.env.VITE_APP_API_HOST?.toString() || 'error',
    errorHelper: import.meta.env.VITE_APP_API_ERROR_HELPER_HOST?.toString() || 'error',
  },
};
