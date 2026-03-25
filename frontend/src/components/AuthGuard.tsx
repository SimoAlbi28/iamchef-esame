import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/apiConfigStore";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuthStore();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
