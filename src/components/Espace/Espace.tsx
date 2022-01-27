import React, { useEffect } from "react";
// import { getUserBoard } from "../../services/user.service";
import { getCurrentUser } from "../../services/auth.service";
import FicheCommerciale from "../FicheCommerciale/FicheCommerciale";
import { gql, useQuery } from "@apollo/client";
import { ExternalLink } from "react-external-link";
import { Helmet } from "react-helmet";

import '../../App.scss'
import AdminHome from "../AdminHome/AdminHome";


const Espace: React.FC = () => {
  const currentUser = getCurrentUser();

  


  useEffect(() => {
    
    
  }, []);


  let titreName = currentUser.title

  const HOME_DATA = gql`
    query Operation($titre: String!) {
      operation(filter: { titre : { eq: $titre}}) {
        dateRemonteAgence
        titre
        id
        slug
        lienAnnonce
        nombreAppels
      }
    }
  `

  // DATA
  const { data } = useQuery(HOME_DATA, { variables: { titre: titreName } });
  const dateMoment = (data && data.operation.dateRemonteAgence)
  const dateRemontee = new Date(dateMoment).toLocaleDateString('fr')


  return (
    <>
      <Helmet>
        <title>Votre espace</title>
      </Helmet>
      
      <div style={{ marginTop: "7em", lineHeight: ".5" }}>
        <p style={{ fontSize: "2rem", marginLeft: "1.5em" }}>Bienvenue 👋</p>
        <h1 style={{ fontSize: "10rem" }}>{" " + currentUser.username}.  </h1>
      </div>

      {
        currentUser.roles.includes("ROLE_ADMIN") ? 

        <AdminHome /> 

        :


      <>

      <div className="box">
        <h2 style={{ fontSize: "3rem" }}>Date dernière remontée annonce 🔝</h2>
        <p style={{ fontSize: "1.5rem", marginLeft: ".3em" }}>Fait le {dateRemontee} 📝</p>
      </div>

      <div className="box">
        <h2 style={{ fontSize: "3rem" }}>L'annonce de votre bien 👨‍💻</h2>
        <ExternalLink href={data && data.operation.lienAnnonce}>
          <h2 className="lienAnnonce">Lien 🔗</h2>
        </ExternalLink>  
      </div>


      <div className="box">
        <h2 style={{ fontSize: "3rem" }}> <span style={{ padding: "0px 5px", border: "4px solid green" }}>{data && data.operation.nombreAppels}</span> personnes ont appelés pour votre bien ☎️</h2>
      </div>


      <div className="box">
        <h2 style={{ fontSize: "3rem" }}>Votre bien 🏠</h2>
        <FicheCommerciale />
      </div>
      
      </>
      
      }
    </>
  );
};

export default Espace;