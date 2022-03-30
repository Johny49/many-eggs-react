import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user-slice";
// components
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
// css
import classes from "./Profile.module.css";

const Profile = () => {
  const user = useSelector(selectUser);

  return (
    <Card className={classes.profile}>
      <div>
        <h2>User Profile </h2>
        <h3>Name: {user.displayName}</h3>
        <h3>Email: {user.email}</h3>
      </div>
    </Card>
  );
};

export default Profile;
