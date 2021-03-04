import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from '../src/pages/homeScreen/homeScreen.component';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import LoginScreen from './pages/login/login.component';
import { auth } from './firebase';
import { useDispatch, useSelector } from "react-redux";
import { selectUser, login, logout } from "./features/userSlice";
import ProfileScreen from './pages/profilescreen/profileScreen.component';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email
        }));
      } else {
        // always write dispatch(logout()) // bcz without logout() it didnt logout directly
        dispatch(logout());
      }
    })
    return unsubscribe;
  }, [dispatch]);
  return (

    <div className="app">
      <Router>
        {!user ? (
          <LoginScreen />
        ) : (
            <Switch>
              <Route exact path="/">
                <HomeScreen />
              </Route>

              <Route exact path="/profile">
                <ProfileScreen />
              </Route>

            </Switch>
          )}
      </Router>
    </div>
  );
}

export default App;