import React,{useEffect} from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "semantic-ui-css/semantic.min.css";
import App from "./App";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";

import firebase from "./firebase";
import { Provider } from "react-redux";
import {
  ReactReduxFirebaseProvider,
} from "react-redux-firebase";
import store from "./store/store";
import PrivateRoute from "./components/auth/PrivateRoute"




const rrfConfig = {
  userProfile: "users",
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
};

const Root =()=>{
  const history =useHistory()

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        history.push("/")
      }else{
        history.push("/login")
      }
    })

  }, [])

  return (
    <Switch>
    <PrivateRoute exact path="/">
      <App/>
    </PrivateRoute>
    <Route path="/signup" component={SignUp} />
    <Route path="/login" component={Login} />
  </Switch>
  );
}


ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <Router>
        <Root />
      </Router>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);
