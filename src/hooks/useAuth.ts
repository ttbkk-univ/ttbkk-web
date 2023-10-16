import { useState } from 'react';

type GoogleUser = {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  nbf: string;
  name: string;
  picture: string;
  given_name: string;
  locale: string;
  iat: number;
  exp: number;
  jti: string;
};

export class User {
  constructor(data: typeof User.prototype) {
    this.email = data.email;
    this.name = data.name;
    this.image = data.image;
    this.iat = data.iat;
    this.exp = data.exp;
  }

  email: string;
  name: string;
  image: string;
  iat: number;
  exp: number;

  get isExpired(): boolean {
    return this.exp < Date.now() / 1000;
  }

  static fromJSONString(jsonString: string) {
    const json = JSON.parse(jsonString);
    return new User(json);
  }

  toJSON() {
    return {
      email: this.email,
      name: this.name,
      image: this.image,
      iat: this.iat,
      exp: this.exp,
    };
  }
}

const parseGoogleJWT = (jwt: string) => {
  const payload: GoogleUser = JSON.parse(atob(jwt.split('.')[1]));
  return {
    name: payload.given_name,
    email: payload.email,
    image: payload.picture,
    iat: payload.iat,
    exp: payload.exp,
  };
};

export const useAuth = (key = 'token') => {
  const jwtPayload = window.localStorage.getItem(key);
  const [user, setUser] = useState<User | null>(
    jwtPayload ? User.fromJSONString(jwtPayload) : null,
  );
  return {
    user,
    setGoogleUser: (credential: string) => {
      const token = JSON.stringify(parseGoogleJWT(credential));
      window.localStorage.setItem(key, token);
      setUser(User.fromJSONString(token));
      window.location.reload();
    },
    logout: () => {
      window.localStorage.removeItem(key);
      setUser(null);
      window.location.reload();
    },
  };
};
