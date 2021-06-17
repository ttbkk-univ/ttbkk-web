interface Env {
  kakao: {
    mapApiKey: string | undefined;
  };
  api: {
    host: string | undefined;
  };
}

export const env: Env = {
  kakao: {
    mapApiKey: process.env.REACT_APP_KAKAO_MAP_API_KEY?.toString(),
  },
  api: {
    host: process.env.REACT_APP_API_HOST?.toString(),
  },
};
