import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

// import IUser from "../types/user.type";
import { register } from "../services/auth.service";

import { gql, useQuery } from "@apollo/client";

import { Helmet } from "react-helmet";

const Register: React.FC = () => {
  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const ALL_OPERATION = gql`
    query AllOperations($orderBy: [OperationModelOrderBy]) {
      allOperations(orderBy: $orderBy) {
        titre
      }
    }
  `
  
  const { data } = useQuery(ALL_OPERATION, {variables: { orderBy : "_createdAt_ASC" }});


  interface Person {
    username: string,
    email: string,
    password: string,
    title: string
  }

  const initialValues: Person = {
    username: "",
    email: "",
    password: "",
    title: data && data.allOperations[0].titre
  }


  

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .test(
        "len",
        "Le prénom doit être compris entre 3 et 20 caractères.",
        (val: any) =>
          val &&
          val.toString().length >= 3 &&
          val.toString().length <= 20
      )
      .required("Ce champs est requis!"),
    email: Yup.string()
      .email("L'email est invalide")
      .required("Ce champs est requis!"),
    password: Yup.string()
      .test(
        "len",
        "Le mot de passe doit être compris entre 3 et 20 caractères",
        (val: any) =>
          val &&
          val.toString().length >= 6 &&
          val.toString().length <= 40
      )
      .required("Ce champs est requis!"),
  });

  const handleRegister = (formValue: Person) => {
    const { username, email, password, title } = formValue;

    register(username, email, password, title).then(
      (response) => {
        setMessage(response.data.message);
        setSuccessful(true);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setSuccessful(false);
      }
    );
  };

  // const handleTest = (formValue: Person) => {
  //   const title = formValue
  //   console.log(title)
  // }

  return (
    <div className="col-md-12">
      <Helmet>
        <title>Enregistrement</title>
      </Helmet>
      <div className="card card-container">
        {/* <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        /> */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          <Form>
            {!successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="username"> Prénom </label>
                  <Field name="username" type="text" className="form-control" />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email"> Email </label>
                  <Field name="email" type="email" className="form-control" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password"> Mot de passe </label>
                  <Field
                    name="password"
                    type="password"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="title"> Bien à vendre </label>
                  <Field as="select" name="title">
                    {
                      data && data.allOperations.map((el:any) => (
                        <option key={el.titre} value={el.titre}>{el.titre}</option>
                      ))
                    }
                    
                    
                  </Field>
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>



                <div className="form-group" style={{ marginTop: "1.5em" }}>
                  <button type="submit" className="btn btn-primary btn-block">Enregistrer</button>
                </div>
              </div>
            )}

            {message && (
              <div className="form-group">
                <div
                  className={
                    successful ? "alert alert-success" : "alert alert-danger"
                  }
                  role="alert"
                >
                  {message}
                </div>
              </div>
            )}
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Register;

