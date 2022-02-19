import React, { useState, useEffect } from "react";
import "./Home.css";
import { StyledFirebaseAuth } from "react-firebaseui";
import LoadingScreen from "./LoadingScreen";
import { Col, Container, Row } from "react-bootstrap";

const Home = ({ setUser }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {}, [setUser]);
  return (
    <Container fluid>
      {loading ? (
        <LoadingScreen />
      ) : (
        <Container className="Home">
          <Row className="row">
            <Col className="logo" lg={6}>
              <Col className="logo-name">QuizApp</Col>
              <Col className="description">
                Create and Join Quiz at a single platform. You can create trivia
                quizzes, personality test, polls and surveys. Share out your
                quiz with your students with a unique code.
              </Col>
            </Col>

            <Col className="login-card" lg={6}>
              <label className="login-label">
                <b>Q</b>
              </label>
            </Col>
          </Row>
        </Container>
      )}
    </Container>
  );
};

export default Home;
