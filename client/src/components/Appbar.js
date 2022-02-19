import React from "react";
import Sidebar from "./Sidebar";
import "./Appbar.css";
import { Link } from "react-router-dom";
import { Icon } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { Col, Container, Navbar } from "react-bootstrap";
import useAuth from "../auth/useAuth";

const Appbar = () => {
  const { user } = useAuth();
  return (
    <Navbar fixed="top">
      <Container className="appbar">
        <Col className="slider">
          <Sidebar />
          <Link to="/" className="home">
            QuizApp
          </Link>
        </Col>
        <Col className="appbar-user">
          <Icon className="icon">
            <AccountCircle />
          </Icon>
          <p>
            <b>{user?.name}</b>
          </p>
        </Col>
      </Container>
    </Navbar>
  );
};

export default Appbar;
