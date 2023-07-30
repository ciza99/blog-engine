export const ACCESS_TOKEN_KEY = "access-token";

const tokenHandlerFactory = () => {
  let token: string | null = window.localStorage.getItem(ACCESS_TOKEN_KEY);

  return {
    getToken: () => token,
    setToken: (value: string) => {
      window.localStorage.setItem(ACCESS_TOKEN_KEY, value);
      token = value;
    },
    deleteToken: () => {
      window.localStorage.removeItem(ACCESS_TOKEN_KEY);
      token = null;
    },
  };
};

export const tokenHandler = tokenHandlerFactory();
