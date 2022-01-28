import React, { useEffect } from "react";
// import { getCurrentUser } from "../../services/auth.service";
import { gql, useQuery } from "@apollo/client";
import CountUp from 'react-countup';

import '../../App.scss'
import "./AdminHome.scss"
import { Button } from "react-bootstrap";


const AdminHome: React.FC = () => {
  // const currentUser = getCurrentUser();

  useEffect(() => {
    
  }, []);

  let date = new Date();
  // let FirstDayOfTheMonth = 
  // let FirstDayOfTheYear = "2022-02-02T14:48:00.000Z" 
  let FirstDayCurrentYear = new Date(date.getFullYear(), date.getMonth(), +2).toISOString()
  let SinceTheBeginning = new Date(date.getFullYear()).toISOString()

  // console.log("TIME MONTH == " + FirstDayOfTheMonth)
  console.log("TIME YEAR == " + FirstDayCurrentYear)

  const GET_ALL = gql`
    query AllOperations($filter: OperationModelFilter, $filter2: CompteRenduModelFilter, $filter3: DateVisiteModelFilter) {
        allOperations(filter: $filter) {
            titre
            nombreAppels
            createdAt
        }
        allCompteRendus(filter: $filter2) {
          id
        }
        allDateVisites(filter: $filter3) {
          id
        }
    }
  `
    
    // DATA
    // const { data } = useQuery(GET_TITRE, { variables: { titre: titreName } });
    const { data, refetch } = useQuery(GET_ALL, { variables: { 
      filter: { "createdAt": { "gt": FirstDayCurrentYear }},
      filter2: { "createdAt": { "gt": FirstDayCurrentYear } },
      filter3: { "createdAt": { "gt": FirstDayCurrentYear }} }});
    // const { data } = useQuery(GET_ALL);



    let collectionBiens: string[] = [];
    const getValue = () => {
      for (var i in data && data.allOperations){
          collectionBiens.push(data && data.allOperations[i].titre)
      };
    }
    getValue()
    let nombreBiens = collectionBiens.length
    console.log(nombreBiens)


    let collectionAppels: number[] = [];
    const getValueAppel = () => {
      for (var i in data && data.allOperations){
          collectionAppels.push(data && data.allOperations[i].nombreAppels)  
      };
      
    }
    getValueAppel();
    let totalAppels = collectionAppels.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    // console.log("appels == " + total)
    console.log("appel == " + totalAppels)
    



    let collectionCompte: string[] = [];
    const getValue2 = () => {
        for (var i in data && data.allCompteRendus){
            collectionCompte.push(data && data.allCompteRendus[i].id)
        };
    }
    getValue2()
    let nombreCompte = collectionCompte.length
    console.log("compte" + nombreCompte)

    let collectionVisites: string[] = [];
    const getValue3 = () => {
        for (var i in data && data.allDateVisites){
            collectionVisites.push(data && data.allDateVisites[i].id)
        };
    }
    getValue3()
    let nombreVisite = collectionVisites.length
    console.log("visite" + nombreVisite)

  // function changeFirstDayToYear() {
  //   FirstDayOfTheMonth = "2022-02-02T14:48:00.000Z"
  //   console.log(FirstDayOfTheMonth)
  // }

    // let collectionVisite: string[] = [];
    // const getDatesVisite = () => {
        
    //     for (var i in data && data.operation.lienVisite){
    //         collectionVisite.push(data && data.operation.lienVisite[i])
    //     };
    //     console.log(collectionVisite[1]);
    // }

    // getDatesVisite()

    // let collectionCompte: string[] = [];
    // const getDatesCompte = () => {
        
    //     for (var i in data && data.operation.lienCompteRendu){
    //         collectionCompte.push(data && data.operation.lienCompteRendu[i])
    //     };
    //     console.log(collectionCompte[1]);
    // }

    // getDatesCompte()


//   function transformDate(date:any) {
//     let dateMoment = date
//     let dateRemontee = new Date(dateMoment).toLocaleDateString('fr')

//     return dateRemontee
//   }
    // let date = new Date();
    // let first = date.getDate() - date.getDay();
    // let firstDay = new Date(date.getFullYear(), date.getMonth(), date.setDate(first));
    // console.log(firstDay.toISOString())


  return (
    <>  
    <div className="box">
      <div style={{ width: "100%", display: "flex", justifyContent: "center", margin:"1.5em 0"  }}>
          <Button className="buttonDate" onClick={() => { refetch({ 
            filter: { "createdAt": { "gt": FirstDayCurrentYear }},
            filter2: { "createdAt": { "gt": FirstDayCurrentYear } },
            filter3: { "createdAt": { "gt": FirstDayCurrentYear }} })} }>
              Cette année
          </Button>
          <Button className="buttonDate" onClick={() => { refetch({ 
            filter: { "createdAt": { "gt": SinceTheBeginning }},
            filter2: { "createdAt": { "gt": SinceTheBeginning } },
            filter3: { "createdAt": { "gt": SinceTheBeginning }} })} }>
              Depuis le début
          </Button>
      </div>
      <div className="numbers_container">
       
          <div className="numbers_box">
           <CountUp duration={.5} end={nombreCompte} />
           <p>Comptes rendus</p>
          </div>
          <div className="numbers_box">
           <CountUp duration={.5} end={nombreVisite} />
           <p>Nombres visites</p>
          </div>
          <div className="numbers_box">
           <CountUp duration={.5} end={totalAppels} />
           <p>Nombres appels</p>
          </div>
          <div className="numbers_box">
           <CountUp duration={.5} end={nombreBiens} />
           <p>Biens en vente</p>
          </div>
      </div>
    </div>


       
      
    </>
  );
};

export default AdminHome;