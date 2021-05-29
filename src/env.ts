interface Kakao {
  mapApiKey: string | undefined;
}

interface Env {
  kakao: Kakao;
}

export const env: Env = {
  kakao: {
    mapApiKey: process.env.REACT_APP_KAKAO_MAP_API_KEY,
  },
};
