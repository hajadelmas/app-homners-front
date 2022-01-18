import React, { useEffect } from "react";
import { getCurrentUser } from "../../services/auth.service";
import { gql, useQuery } from "@apollo/client";
import { Helmet } from "react-helmet";



import './dateVisite.scss'


const ActionsAgents: React.FC = () => {
  // const [content, setContent] = useState<string>("");
  const currentUser = getCurrentUser();

  


  useEffect(() => {
    
  }, []);

  let titreName = currentUser.title

  const GET_TITRE = gql`
    query Operation($titre: String!) {
      operation(filter: { titre : { eq: $titre}}) {
        id
        titre
        dateRemonteAgence
        lienVisite {
          dateDeLaVisite
        }
        lienCompteRendu {
          titre
          date
          _updatedAt
        }
      }
    }
  `
    
    // DATA
    const { data } = useQuery(GET_TITRE, { variables: { titre: titreName } });

    let collectionVisite: string[] = [];
    const getDatesVisite = () => {
        
        for (var i in data && data.operation.lienVisite){
            collectionVisite.push(data && data.operation.lienVisite[i])
        };
        console.log(collectionVisite[1]);
    }

    getDatesVisite()

    let collectionCompte: string[] = [];
    const getDatesCompte = () => {
        
        for (var i in data && data.operation.lienCompteRendu){
            collectionCompte.push(data && data.operation.lienCompteRendu[i])
        };
        console.log(collectionCompte[1]);
    }

    getDatesCompte()


  function transformDate(date:any) {
    let dateMoment = date
    let dateRemontee = new Date(dateMoment).toLocaleDateString('fr')

    return dateRemontee
  }




  return (
    <>  
      <div style={{ marginTop: "5em" }}>
      <Helmet>
        <title>Actions agents</title>
      </Helmet>
        <h1 style={{ fontSize: "5rem" }}>Actions</h1>

      <table style={{ marginTop: "5em" }}>
            <caption> <h3>Tableau synthétique</h3> </caption>
          <tbody>
            <tr>
              <th>Date dernière remontée annonce</th>
              <td>- Le {transformDate(data && data.operation.dateRemonteAgence)}</td>
            </tr>
            <tr>
              <th>Dates des visites</th>
              {
                  collectionVisite.map((el:any, index: number) => (
                      <td style={{ display: "flex", flexDirection: "column" }} key={index}>- Le { transformDate(el.dateDeLaVisite)}</td>
                  ))
              }
            </tr>
            <tr>
              <th>Dates remplissage comptes rendus</th>
              {
                  collectionCompte.map((el:any, index: number) => (
                      <td style={{ display: "flex", flexDirection: "column" }} key={index}>- Le { transformDate(el._updatedAt)} - { el.titre }</td>
                  ))
              }
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ActionsAgents;