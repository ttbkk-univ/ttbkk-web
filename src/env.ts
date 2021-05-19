interface Google {
  mapApiKey: string | undefined;
}

interface Env {
  google: Google;
}

export const env: Env = {
  google: {
    mapApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
  },
};
