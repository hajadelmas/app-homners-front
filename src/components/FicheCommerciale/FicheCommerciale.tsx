import { gql, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { getCurrentUser } from "../../services/auth.service";

import "./fiche.scss"


const FicheCommerciale: React.FC = () => {
//   const [content, setContent] = useState<string>("");

  useEffect(() => {
    
  }, []);

  const currentUser = getCurrentUser();


  let titreName = currentUser.title

  const FICHE_COMMERCIALE = gql`
  query Operation($titre: String!) {
    operation(filter: { titre : { eq: $titre}}) {
      slug
      surface
      surfaceTerrain
      titre
      typeChauffage
      typeDeBien
      typeDeTransaction
      reference
      procedureDiligente
      prix
      photos {
        responsiveImage {
          src
        }
      }
      nombrePieces
      nombreLotCopropriete
      neufAncien
      modeChauffage
      lienLeboncoin
      jardin
      description
      etatGeneral
      calme
      chambres
      clair
      commune
      id
      bienEnCopropriete
      dateRemonteAgence
    }
  }
`

  // DATA
  const { data } = useQuery(FICHE_COMMERCIALE, { variables: { titre: titreName } });

  return (
    <>
    <div className='container_product'>
      <div className='container_desc'>
        <h4>{data && data.operation.titre}</h4>
        <h5>Commune: {data && data.operation.commune}</h5>
        <div className='' dangerouslySetInnerHTML={{ __html: data && data.description, }}></div>
        {/* <h3>Pour plus de détails, <Link to={lienLeboncoin}>Cliquez ici.</Link></h3> */}
        </div>
      </div>
      <div className="tableau">
        <table>
            <caption> <h3>Informations générales</h3> </caption>
          <tbody>
            <tr>
              <th>Type de bien</th>
              <td>{data && data.operation.typeDeBien}</td>
            </tr>
            <tr>
              <th>Type de transaction</th>
              <td>{data && data.operation.typeDeTransaction}</td>
            </tr>
          </tbody>
        </table>

        <table>
            <caption><h3>Localisation</h3> </caption>
          <tbody>
            <tr>
              <th>localisation</th>
              <td>{data && data.operation.commune}</td>
            </tr>
          </tbody>
        </table>

        <table>
            <caption><h3>Aspect financier</h3> </caption>
          <tbody>
            <tr>
              <th>Prix</th>
              <td>{data && data.operation.prix} €</td>
            </tr>
          </tbody>
        </table>

        <table>
            <caption><h3>Copropriété</h3> </caption>
          <tbody>
            <tr>
              <th>Bien en copropriété</th>
              <td>{data && data.operation.bienEnCopropriete ? "oui" : "non"}</td>
            </tr>
            <tr>
              <th>Nombre de lots copro</th>
              <td>{data && data.operation.nombreLotCopropriete}</td>
            </tr>
            <tr>
              <th>Procédures diligentées</th>
              <td>{data && data.operation.procedureDiligente}</td>
            </tr>
          </tbody>
        </table>

        <table>
            <caption><h3>Intérieur</h3> </caption>
          <tbody>
            <tr>
              <th>Nombre de pieces</th>
              <td>{data && data.operation.nombrePieces}</td>
            </tr>
            <tr>
              <th>Chambres</th>
              <td>{data && data.operation.chambres}</td>
            </tr>
            <tr>
              <th>Type de chauffage</th>
              <td>{data && data.operation.typeChauffage}</td>
            </tr>
            <tr>
              <th>Mode de chauffage</th>
              <td>{data && data.operation.modeChauffage}</td>
            </tr>
            <tr>
              <th>Calme</th>
              <td>{data && data.operation.calme ? "oui" : "non"}</td>
            </tr>
            <tr>
              <th>Clair</th>
              <td>{data && data.operation.clair ? "oui" : "non"}</td>
            </tr>
          </tbody>
        </table>


        <table>
            <caption><h3>Extérieur</h3> </caption>
          <tbody>
            <tr>
              <th>Jardin</th>
              <td>{data && data.operation.jardin ? "oui" : "non"}</td>
            </tr>
            <tr>
              <th>Neuf - Ancien</th>
              <td>{data && data.operation.neufAncien}</td>
            </tr>
            <tr>
              <th>Etat général</th>
              <td>{data && data.operation.etatGeneral}</td>
            </tr>
          </tbody>
        </table>

        <table>
            <caption><h3>Surfaces</h3> </caption>
          <tbody>
            <tr>
              <th>Surface</th>
              <td>{data && data.operation.surface}</td>
            </tr>
            <tr>
              <th>Surface terrain</th>
              <td>{data && data.operation.surfaceTerrain}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FicheCommerciale;

