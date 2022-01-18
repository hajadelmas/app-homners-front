import React, { useEffect } from "react";
// import { getUserBoard } from "../../services/user.service";
import Bienvenue from "../Bienvenue";


const BoardUser: React.FC = () => {
  // const [content, setContent] = useState<string>("");

  


  useEffect(() => {
    // getUserBoard().then(
    //   (response) => {
    //     setContent(response.data);
    //   },
    //   (error) => {
    //     const _content =
    //       (error.response &&
    //         error.response.data &&
    //         error.response.data.message) ||
    //       error.message ||
    //       error.toString();

    //     setContent(_content);
    //   }
    // );

    

    
  }, []);


  return (
      <>
        
        <Bienvenue />
        
      </>
  );
};

export default BoardUser;