import React, { useEffect } from "react";
import Bienvenue from "./Bienvenue";

// import { getPublicContent } from "../services/user.service";

const Home: React.FC = () => {
  // const [content, setContent] = useState<string>("");

  useEffect(() => {
    // getPublicContent().then(
    //   (response) => {
    //     setContent(response.data);
    //   },
    //   (error) => {
    //     const _content =
    //       (error.response && error.response.data) ||
    //       error.message ||
    //       error.toString();

    //     setContent(_content);
    //   }
    // );
  }, []);

  return (

    <>
      <Bienvenue />
      {/* <h3>{content}</h3> */}
    </>
    
      
      
      
  );
};

export default Home;