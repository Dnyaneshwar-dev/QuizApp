import React from "react";
import "./Appbar.css";
import { Link } from "react-router-dom";
import { Icon } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { Col, Container, Navbar } from "react-bootstrap";
import useAuth from "../auth/useAuth";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { Button } from "@material-ui/core";
import "./Sidebar.css";
import {
  CreateNewFolder,
  Dashboard,
  ExitToApp,
  MeetingRoom,
  MenuOpenRounded,
  MenuRounded,
} from "@material-ui/icons";

const Appbar = () => {
  const { user, logOut } = useAuth();
  return (
    <Navbar fixed="top">
      <Container className="appbarmain"></Container>

      <Container className="appbar">
        <Col
          className="slider"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          <Link to="/" className="home">
            QuizApp
          </Link>
        </Col>
        <Col className="appbar-user">
          <Icon className="icon">
            <Dashboard />
          </Icon>
          <Link to="/dashboard">
            <p
              style={{
                color: "white",
                fontSize: "15px",
              }}
            >
              <b>Dashboard</b>
            </p>
          </Link>
        </Col>

        <Col className="appbar-user">
          <Icon className="icon">
            <MeetingRoom />
          </Icon>
          <Link to="/join-quiz">
            <p
              style={{
                color: "white",
                fontSize: "15px",
              }}
            >
              <b>Join Quiz</b>
            </p>
          </Link>
        </Col>
        <Col className="appbar-user">
          <Icon className="icon">
            <CreateNewFolder />
          </Icon>
          <Link to="/create-quiz">
            <p
              style={{
                color: "white",
                fontSize: "15px",
              }}
            >
              <b>Create Quiz</b>
            </p>
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
        {user ? (
          <Col className="appbar-user">
            <button
              style={{
                padding: 2,
                backgroundColor: "blue",
                color: "white",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "20%",
                width: "40px",
                height: "40px",
              }}
              onClick={() => logOut()}
            >
              <Icon>
                <ExitToApp />
              </Icon>
            </button>
          </Col>
        ) : (
          <></>
        )}
      </Container>
    </Navbar>
  );
};

export default Appbar;
