import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../store/user-slice";

const ProfilePage = () => {
  const user = useSelector(selectUser);

  if (!user) {
    return <Navigate replace to="/" />;
  }

  return <h2>This is the profile page ... </h2>;
};

export default ProfilePage;
