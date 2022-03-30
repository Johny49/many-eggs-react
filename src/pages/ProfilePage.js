import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../store/user-slice";
import Profile from "../components/Profile/Profile";

const ProfilePage = () => {
  const user = useSelector(selectUser);

  if (!user) {
    return <Navigate replace to="/" />;
  }

  return <Profile />;
};

export default ProfilePage;
