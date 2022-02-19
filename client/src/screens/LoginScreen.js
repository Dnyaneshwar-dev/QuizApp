import React, { useState, useEffect } from "react";
import "./LoginScreen.css";
import LoadingScreen from "./LoadingScreen";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import useAuth from "../auth/useAuth";
import { Redirect } from "react-router-dom";

const LoginScreen = () => {
  const { logIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const res = await axios.post("/API/users/signin", {
      username: username,
      password: password,
    });
    console.log(res);
    if (res.data.ok == true) {
      logIn(res.data.token);
      setRedirect(true);
    } else {
      alert("Invalid Username or Password");
    }
  };

  if (redirect) return <Redirect to="/" />;

  return (
    <Container fluid>
      {loading ? (
        <LoadingScreen />
      ) : (
        <Container className="Home">
          <Row className="row">
            <Col
              className="login-card"
              style={{
                margin: "auto",
                marginTop: "5%",
              }}
              xs={12}
              lg={6}
            >
              <label className="login-label">
                <b>Q</b>
              </label>

              <div
                class="form-group d-flex justify-content-center"
                style={{
                  padding: 10,
                }}
              >
                <label for="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  style={{
                    width: "80%",
                    height: 40,
                    borderRadius: "10px",
                  }}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter password"
                  style={{
                    marginTop: 10,
                    width: "80%",
                    height: 40,
                    borderRadius: "10px",
                  }}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button
                  type="submit"
                  style={{
                    marginTop: 10,
                    width: "80%",
                    height: 40,
                    backgroundColor: "blue",
                    borderRadius: "10px",
                    color: "white",
                  }}
                  onClick={() => handleSubmit()}
                >
                  Submit
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </Container>
  );
};

export default LoginScreen;
