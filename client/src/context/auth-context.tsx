import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { ACCESS_TOKEN_KEY, tokenHandler } from "utils/token-handler";

type AuthContextType = {
  isLoggedIn: boolean;
};
const AuthContext = createContext<AuthContextType>(undefined as never);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => tokenHandler.getToken() !== null
  );

  useEffect(() => {
    const listener = (storageEvent: StorageEvent) => {
      if (storageEvent.key !== ACCESS_TOKEN_KEY) {
        return;
      }

      setIsLoggedIn(tokenHandler.getToken() !== null);
    };

    window.addEventListener("storage", listener);

    return () => window.removeEventListener("storage", listener);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
