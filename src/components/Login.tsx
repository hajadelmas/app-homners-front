import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { login } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import Logo from '../images/logo-homners.png'
import Helmet from "react-helmet";

import './Login.scss'
// import { useHistory } from "react-router-dom";

// interface RouterProps {
//   history: string;
// }

// type Props = RouteComponentProps<RouterProps>;

const Login: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  let navigate = useNavigate();

  const initialValues: {
    username: string;
    password: string;
  } = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Ce champs est requis!"),
    password: Yup.string().required("Ce champs est requis!"),
  });

  const handleLogin = (formValue: { username: string; password: string }) => {
    const { username, password } = formValue;

    setMessage("");
    setLoading(true);

    login(username, password).then(
      () => {
        navigate("/espace");
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      }
    );
  };

  return (
    <div className="col-md-12">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="card card-container">
        <img
          src={Logo}
          alt="logo homners"
          className="profile-img-card"
        />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form>
            <div className="form-group">
              <label htmlFor="username">Nom utilisateur</label>
              <Field name="username" type="text" className="form-control" />
              <ErrorMessage
                name="username"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <Field name="password" type="password" className="form-control" />
              <ErrorMessage
                name="password"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className="form-group " style={{ display: "flex", justifyContent: "center", marginTop: "1em"}}>
              <button type="submit" className="btn btn-primary btn-block box2" disabled={loading}>
                {loading && (
                  <span className="spinner-border spinner-border-sm" style={{ marginRight: "1em" }}></span>
                )}
                <span className="connectButton">Connexion</span>
              </button>
            </div>

            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
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

export default Login;