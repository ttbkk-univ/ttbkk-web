interface Env {
  kakao: {
    mapApiKey: string;
  };
  api: {
    host: string;
    errorHelper: string;
  };
  google: {
    login: string;
  };
}

export const env: Env = {
  kakao: {
    mapApiKey: process.env.REACT_APP_KAKAO_MAP_API_KEY?.toString() || 'error',
  },
  api: {
    host: process.env.REACT_APP_API_HOST?.toString() || 'error',
    errorHelper: process.env.REACT_APP_API_ERROR_HELPER_HOST?.toString() || 'error',
  },
  google: {
    login: process.env.REACT_APP_CLIENT_ID?.toString() || 'error',
  },
};
