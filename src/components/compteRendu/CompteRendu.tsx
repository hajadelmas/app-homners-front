import React, { useEffect } from "react";
import { getCurrentUser } from "../../services/auth.service";
import { gql, useQuery } from "@apollo/client";



import './compte_rendu.scss'


const CompteRendu: React.FC = () => {
  // const [content, setContent] = useState<string>("");
  const currentUser = getCurrentUser();

  


  useEffect(() => {
    
  }, []);

  let titreName = currentUser.title

  const COMPTE_RENDU = gql`
    query Operation($titre: String!, $markdown: Boolean) {
      operation(filter: { titre : { eq: $titre}}) {
        id
        titre
        lienCompteRendu {
          titre
          date
          description(markdown: $markdown)
        }
      }
    }
  `
    
    // DATA
    const { data } = useQuery(COMPTE_RENDU, { variables: { titre: titreName, markdown: true } });

    let collection: string[] = [];
    const getdates = () => {
        
        for (var i in data && data.operation.lienCompteRendu){
            collection.push(data && data.operation.lienCompteRendu[i])
        };
        // console.log(collection[1]);
    }

    getdates()


  function transformDate(date:any) {
    let dateMoment = date
    let dateRemontee = new Date(dateMoment).toLocaleDateString('fr')

    return dateRemontee
  }




  return (
    <>  
      <div style={{ marginTop: "5em" }}>
        <h1 style={{ fontSize: "8rem" }}>Comptes rendus 📝</h1>
        {
            collection.map((el:any, index: number) => (
                <div key={index} style={{lineHeight: ".5" }} className="box">
                  <p style={{ fontStyle: "italic" }}>Le {transformDate(el.date)}</p>
                  <h3>{el.titre}</h3>
                  <div className='' dangerouslySetInnerHTML={{ __html: el.description }}></div>
                  
                </div>
            ))
        }
      </div>
    </>
  );
};

export default CompteRendu;