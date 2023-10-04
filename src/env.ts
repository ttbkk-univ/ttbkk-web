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
    mapApiKey: import.meta.env.VITE_KAKAO_MAP_API_KEY,
  },
  api: {
    host: import.meta.env.VITE_API_HOST,
    errorHelper: import.meta.env.VITE_API_ERROR_HELPER_HOST,
  },
};
