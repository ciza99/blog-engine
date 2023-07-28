const tokenHandlerFactory = () => {
  let token: string | null = window.localStorage.getItem("access-token");

  return {
    getToken: () => token,
    setToken: (value: string) => {
      window.localStorage.setItem("access-token", value);
      token = value;
    },
    deleteToken: () => {
      window.localStorage.removeItem("access-token");
      token = null;
    },
  };
};

export const tokenHandler = tokenHandlerFactory();
