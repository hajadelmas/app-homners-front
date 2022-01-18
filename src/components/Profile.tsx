import React from "react";
import { getCurrentUser } from "../services/auth.service";
import { Helmet } from "react-helmet";

const Profile: React.FC = () => {
  const currentUser = getCurrentUser();

  return (
    <div className="container">
      <Helmet>
        <title>Profil</title>
      </Helmet>
      <header className="jumbotron">
        <h3>
          Profile de <strong>{currentUser.username}</strong> 
        </h3>
      </header>
      {/* <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p> */}
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      {/* <strong>Authorities:</strong> */}
      {/* <ul>
        {currentUser.roles &&
          currentUser.roles.map((role: string, index: number) => <li key={index}>{role}</li>)}
      </ul> */}
    </div>
  );
};

export default Profile;