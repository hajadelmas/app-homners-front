import React, { useState, useEffect } from "react";
import { getUserBoard } from "../../services/user.service";
import { getCurrentUser } from "../../services/auth.service";
import FicheCommerciale from "../FicheCommerciale/FicheCommerciale";
import { gql, useQuery } from "@apollo/client";
import { ExternalLink } from "react-external-link";
import './BoardUser.scss'


const BoardUser: React.FC = () => {
  const [content, setContent] = useState<string>("");
  const currentUser = getCurrentUser();

  


  useEffect(() => {
    getUserBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );

    

    // let idMaison = data.operation.id
    // console.log(idMaison)
    
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
      }
    }
  `

  // DATA
  const { data } = useQuery(HOME_DATA, { variables: { titre: titreName } });
  const dateMoment = (data && data.operation.dateRemonteAgence)
  const dateRemontee = new Date(dateMoment).toLocaleDateString('fr')


  return (
    <>
      
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
            <div style={{ color: "white", fontSize: "1.5rem" }}>
                Homners Application
            </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                {showModeratorBoard && (
                    <li className="nav-item">
                    <Link to={"/mod"} className="nav-link">
                        Moderator Board
                    </Link>
                    </li>
                )}

                {showAdminBoard && (
                    <>
                    <li className="nav-item">
                        <Link to={"/admin"} className="nav-link">
                        Admin Board
                        </Link>
                    </li>
                    
                    <li className="nav-item">
                        <Link to={"/register"} className="nav-link">
                        Nouveau client
                        </Link>
                    </li>
                    </>
                    
                )}

                {currentUser && (
                    <>
                    <li className="nav-item">
                        <Link to={"/user"} className="nav-link">
                        Votre Espace
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/comptes-rendus"} className="nav-link">
                        Comptes-rendus
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/actions-agents"} className="nav-link">
                        Actions de l'agent
                        </Link>
                    </li>
                    </>
                )}
                </div>
                {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                Se deconnecter
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Se connecter
              </Link>
            </li>

            
          </div>
        )}
                </div>
            </div>
        </nav>

      
      
      
    </>
  );
};

export default BoardUser;