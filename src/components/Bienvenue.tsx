import React from "react";
import { Link } from "react-router-dom";

const Bienvenue: React.FC = () => {

  return (
    <div style={{ height: "60vh", width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <h1>Bienvenue sur l'application Homners</h1>
      <div className="lienAnnonce" style={{ marginTop: "2em" }}>
        <Link to={"/espace"}>
          <h2 >Accéder à votre espace 🚀</h2>
        </Link>  
      </div>
    </div>
  );
};

export default Bienvenue;