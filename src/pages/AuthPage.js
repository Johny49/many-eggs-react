import { useLocation } from "react-router-dom";
import AuthForm from "../components/AuthForm/AuthForm";

const AuthPage = () => {
  const location = useLocation();
  const isLogin = location.pathname === "/login" ? true : false;

  return <AuthForm isLogin={isLogin} />;
};

export default AuthPage;
