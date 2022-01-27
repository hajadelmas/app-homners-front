import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../services/auth.service";


const Bienvenue: React.FC = () => {

  const UserOrNot = getCurrentUser()

  useEffect(() => {
    // const user = getCurrentUser().roles
    
  }, []);
  

  return (
    <div style={{ height: "60vh", width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <h1>Bienvenue sur l'application Homners</h1>
      <div className="lienAnnonce" style={{ marginTop: "2em" }}>
        {UserOrNot === null ? 
        <Link to={"/login"}>
          <h2 >Connectez-vous 🚀</h2>
        </Link>  
      : UserOrNot.roles.includes("ROLE_ADMIN") ?
        <Link to={"/espace"}>
          <h2 >Accéder à votre espace Admin 🚀</h2>
        </Link> 
        :
        <Link to={"/espace"}>
          <h2 >Accéder à votre espace 🚀</h2>
        </Link> 
      }
        
      </div>
    </div>
  );
};

export default Bienvenue;