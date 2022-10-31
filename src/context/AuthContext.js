import { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from 'next/router';
import { api, setAuthoriseHeaders, removeAuthoriseHeaders } from '../service/configs/axiosConfig';
import Loader from '../components/Loader';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  const handleError = () => setError(false);

  const loadUserFromLocalStorage = () => {
    const storedUser = {
      username: localStorage.getItem("username"),
      token: localStorage.getItem("token")
    }
    if ( storedUser.token ) {
      setAuthoriseHeaders(storedUser.token)
      api.get(`/users?name=${storedUser.username}`)
        .then(res => {
          const user = res.data;
          setUser(user);
          setIsLoading(false);
          router.replace("/");
        })
        .catch(() => {
          removeAuthoriseHeaders();
          localStorage.clear();
          setUser(null);
          setIsLoading(false);
          router.replace("/login");
        })
    } else {
      removeAuthoriseHeaders();
      localStorage.clear();
      setUser(null);
      setIsLoading(false);
      router.replace("/login");
    }
  }

  useEffect(() => {
    loadUserFromLocalStorage();
  }, []);

  const login = (cred) => {
    removeAuthoriseHeaders()
    api.post('/auth', cred)
      .then(res => {
        const user = res.data;
        setAuthoriseHeaders(user.token);
        localStorage.setItem("username", user.username);
        localStorage.setItem("token", user.token);
        setUser(user);
        setError(false);
        router.replace("/");
      })
      .catch(() => {
        setUser(null);
        setError(true);
        setIsLoading(false);
      });
  }

  const logout = () => {
    removeAuthoriseHeaders();
    localStorage.clear();
    setUser(null);
    setIsLoading(false);
    router.replace("/login");
  }

  const state = {
    isAuthenticated: !!user,
    user,
    isLoading,
    login,
    logout,
    handleError,
    error
  }

  return (
    <AuthContext.Provider value={ state }>
      { children }
    </AuthContext.Provider>
  );

};

export const useAuth = () => {
  const state = useContext(AuthContext);
  if ( state === undefined ) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return state;
};

export const ProtectRoute = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading || (!isAuthenticated && !router.asPath.endsWith("login"))){
    return <Loader />
  }
  return children;
};
