import { Switch, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";

// Stylesheet
import "./App.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// Components
import Home from "./screens/Home";
import OneTimeDashBoard from "./screens/OneTimeDashboard";
import CreateQuiz from "./screens/CreateQuiz";
import JoinQuiz from "./screens/JoinQuiz";
import UserDashboard from "./screens/UserDashboard";
import CreatedSuccesfully from "./screens/CreatedSuccesfully";
import NotFoundPage from "./screens/NotFoundPage";
import AttemptQuiz from "./screens/AttemptQuiz";
import Appbar from "./components/Appbar";
import Responses from "./screens/Responses";
import LoginScreen from "./screens/LoginScreen";
import AuthContext from "./auth/context";
import getUser from "./auth/getUser";

const App = () => {
  const [user, setUser] = useState(getUser());
  const store = { user, setUser };

  return (
    <div className="App">
      <>
        <div>
          <AuthContext.Provider value={store}>
            <Appbar user={user} setUser={setUser} />
          </AuthContext.Provider>
        </div>
        <Switch>
          <Route exact path="/">
            <AuthContext.Provider value={store}>
              {user ? <UserDashboard /> : <LoginScreen />}
            </AuthContext.Provider>
          </Route>
          <Route path="/dashboard">
            <AuthContext.Provider value={store}>
              {user ? <UserDashboard /> : <LoginScreen />}
            </AuthContext.Provider>
          </Route>
          <Route path="/create-quiz">
            <AuthContext.Provider value={store}>
              {user ? <CreateQuiz /> : <LoginScreen />}
            </AuthContext.Provider>
          </Route>
          <Route
            path="/created-succesfully/:quizCode"
            component={CreatedSuccesfully}
          />
          <Route path="/join-quiz">
            <AuthContext.Provider value={store}>
              {user ? <JoinQuiz /> : <LoginScreen />}
            </AuthContext.Provider>
          </Route>
          <Route path="/attempt-quiz/:quizCode">
            <AuthContext.Provider value={store}>
              {user ? <AttemptQuiz /> : <LoginScreen />}
            </AuthContext.Provider>
          </Route>

          <Route path="/responses/:quizCode" component={Responses} />
          <Route component={NotFoundPage} />
        </Switch>
      </>
    </div>
  );
};

export default App;
