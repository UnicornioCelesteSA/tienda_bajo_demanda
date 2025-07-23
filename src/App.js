import React from "react";
import { Switch, Route } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { ProductList } from "./components/ProductList";
import Carrito from "./pages/Carrito";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <PrivateRoute path="/productos" component={ProductList} />
      <PrivateRoute path="/carrito" component={Carrito} />
    </Switch>
  );
}

export default App;
