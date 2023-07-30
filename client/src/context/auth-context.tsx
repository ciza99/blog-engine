import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { tokenHandler } from "utils/token-handler";

type AuthContextType = {
  isLoggedIn: boolean;
  refreshAuth: () => void;
};
const AuthContext = createContext<AuthContextType>(undefined as never);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => tokenHandler.getToken() !== null
  );

  const refreshAuth = useCallback(() => {
    setIsLoggedIn(tokenHandler.getToken() !== null);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, refreshAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
